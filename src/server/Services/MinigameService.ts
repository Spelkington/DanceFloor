import { KnitServer as Knit, Signal, RemoteProperty, RemoteSignal } from "@rbxts/knit";
import { Players, ServerStorage } from "@rbxts/services";

declare global {
	interface KnitServices {
		MinigameService: typeof MinigameService;
	}
}

/**
 * Service to send minigames to players.
 */
const MinigameService = Knit.CreateService({
	Name: "MinigameService",

	/**
	 * Define the storage location of all minigame ScreenGuis
	 */
	MinigameStorage: ServerStorage.Minigames,

	/**
	 * Map of players currently playing minigames, along with the game
	 * they're currently playing.
	 */
	PlayerMinigames: new Map<Player, Instance>(),

	/**
	 * Definitions for client-side service methods and signals
	 */
	Client: {
		ExitMinigame: new RemoteSignal<() => void>(),
	},

	StartMinigameForPlayer(player: Player, gameName: string) {
		// If the player is currently already playing a minigame,
		// destroy it.
		if (this.PlayerMinigames.has(player)) {
			this.ExitMinigameForPlayer(player);
		}

		// Clone the target minigame into the player's GUI
		const source = this.MinigameStorage.FindFirstChild(gameName);
		const minigame = source!.Clone();
		minigame.Parent = player.FindFirstChild("PlayerGui");

		// Track the minigame in the object map
		this.PlayerMinigames.set(player, minigame);
	},

	ExitMinigameForPlayer(player: Player) {
		const minigame = this.PlayerMinigames.get(player);
		minigame!.Destroy();

		this.PlayerMinigames.delete(player);
	},

	/**
	 * Method run on the Knit initialization of the service.
	 */
	KnitInit() {
		print("MinigameService initialized!");
	},
});

export = MinigameService;
