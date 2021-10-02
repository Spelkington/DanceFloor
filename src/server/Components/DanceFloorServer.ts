import { KnitServer as Knit, Component, Janitor, Timer } from "@rbxts/knit";
import { GetPlayerFromPart } from "shared/FunctionLibrary";
const MinigameService = Knit.GetService("MinigameService");

/**
 * Create the server-side logic for a Dance Floor instance that will track which
 * players are currently looking to party and play the Dance Floor minigame.
 */
class DanceFloorServer implements Component.ComponentClass {
	public static Tag = "DanceFloor";

	private janitor = new Janitor();
	private timer = new Timer(0.75, this.janitor);

	/**
	 * Set of players currently on the dance floor.
	 */
	public currentPlayers = new Set();

	// Radius away from the detector a user needs to be to exit the minigame.
	// TODO: Use a less expensive method for leave detection.
	private LEAVE_RADIUS = 25;

	/**
	 * Construct a new DanceFloor object.
	 *
	 * @param instance The Model instance tagged DanceFloor
	 */
	constructor(instance: Instance) {
		assert(instance.IsA("Model"));
		assert(instance.FindFirstChild("Detector"));

		const detector: BasePart = <BasePart>instance.FindFirstChild("Detector");

		// Register players to the dance floor once they've touched
		// the detector block.
		this.janitor.Add(
			detector.Touched.Connect((touched) => {
				const player = GetPlayerFromPart(touched);
				if (player && !this.currentPlayers.has(player)) {
					this.onPlayerJoin(player);
				}
			}),
		);

		// Use the Timer to check every second which players have left
		// the dance floor.
		this.timer.Tick.Connect(() => {
			for (const instance of this.currentPlayers) {
				// Assume the player set only contains players
				const player = <Player>instance;
				this.checkPlayerExit(player, detector);
			}
		});
		this.timer.Start();
	}

	/**
	 * Register a player to the dance floor, and add the dancing minigame to
	 * their client.
	 *
	 * @param player Player to be registered
	 * @returns
	 */
	private onPlayerJoin(player: Player) {
		print("Player joined dancing:");
		print(player);
		this.currentPlayers.add(player);

		MinigameService.StartMinigameForPlayer(player, "DanceMinigame");

		return;
	}

	/**
	 * Unregister a player from the dance floor. Remove the dance minigame
	 * GUI from their client.
	 *
	 * @param player Player to be unregistered
	 * @returns
	 */
	private onPlayerExit(player: Player) {
		print("Player stopped dancing:");
		print(player);

		MinigameService.ExitMinigameForPlayer(player);

		this.currentPlayers.delete(player);
		return;
	}

	/**
	 * Check if a registered player has left the vicinity of a dance floor and,
	 * if so, unregister them.
	 *
	 * @param player
	 * @param detector
	 * @returns
	 */
	private checkPlayerExit(player: Player, detector: BasePart) {
		const rootInst = player.Character?.FindFirstChild("HumanoidRootPart");
		if (rootInst) {
			// TODO: Use a less expensive method for leave detection.
			const root = <BasePart>rootInst;
			const distance: Vector3 = detector.Position.sub(root.Position);

			if (distance.Magnitude > this.LEAVE_RADIUS) {
				this.onPlayerExit(player);
			}
		}
		return;
	}

	/**
	 * Clean up resources if the DanceFloor is destroyed.
	 */
	public Destroy() {
		this.janitor.Destroy();
	}
}

export = DanceFloorServer;
