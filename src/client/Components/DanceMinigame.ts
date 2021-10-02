import { KnitClient as Knit, Component, Timer, Janitor } from "@rbxts/knit";
import { AlmostNever } from "shared/SongLibrary/AlmostNever";

const LocalPlayer = game.GetService("Players").LocalPlayer as Player;
const PlayerGui = LocalPlayer.FindFirstChildOfClass("PlayerGui");

class DanceMinigame implements Component.ComponentClass {
	public static Tag = "DanceMinigame";

	/**
	 * Stores the minigame's copy of the ScreenGui
	 */
	private janitor = new Janitor();
	private gui = <DanceMinigameGui>new Instance("ScreenGui");
	private timer = new Timer(1, this.janitor);
	private musicNotes = new Array<ImageLabel>();
	private activeNotes = new Array<ImageLabel>();
	private expiredNotes = new Array<ImageLabel>();
	private song = new AlmostNever();
	private music = new Instance("Sound");

	constructor(instance: Instance) {
		assert(instance.IsA("ScreenGui"));
		this.gui = <DanceMinigameGui>instance;
		this.gui.MusicNote.Visible = false;

		this.startSong("test title TODO change later");

		print("DanceMinigame started!");
	}

	private startSong(title: string) {
		// TODO: Actually load the song.
		this.music = new Instance("Sound");
		this.music.Parent = LocalPlayer;
		this.music.SoundId = this.song.SongID;

		const speedMultiplier = 2;

		const sourceTick = 0.00251;
		const accuracy = 0.1;
		const adjustedTick = sourceTick / accuracy;
		const tickOffset = 0; //speedMultiplier / adjustedTick;

		// Reset to a new timer
		this.timer.Destroy();
		this.timer = new Timer(adjustedTick, this.janitor);

		let noteIndex = 0;
		let tick = 0;
		const lastTime = DateTime.now().UnixTimestampMillis;
		this.timer.Tick.Connect(() => {
			if (tick + tickOffset >= this.song.Data[noteIndex]) {
				const time = DateTime.now().UnixTimestampMillis;
				const elapsedTicks = (time - lastTime) / (sourceTick * 1000);

				print([elapsedTicks, tick + tickOffset, this.song.Data[noteIndex]]);
				this.startNote();
				noteIndex++;
			}

			//for (const note of this.musicNotes) {
			//	note.Position = note.Position.add(new UDim2(adjustedTick / speedMultiplier, 0, 0, 0));

			//	if (note.Position.X.Scale > 1) {
			//		note.Destroy();
			//	}
			//}

			tick += 1 / accuracy;
		});

		this.music.Play();
		this.timer.Start();

		print("Song Started!");
	}

	private startNote() {
		const newNote = this.gui.MusicNote.Clone();
		newNote.Parent = this.gui;
		newNote.Visible = true;
		newNote.Name = "Note";
		newNote.Position = new UDim2(0, 0, newNote.Position.Y.Scale, 0);
		this.musicNotes.push(newNote);

		print("Note Created!");
	}

	public Destroy() {
		this.janitor.Destroy();
	}
}

export = DanceMinigame;
