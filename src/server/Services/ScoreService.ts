import { KnitServer as Knit, Signal, RemoteProperty, RemoteSignal } from "@rbxts/knit";
import { Players } from "@rbxts/services";

declare global {
	interface KnitServices {
		ScoreService: typeof ScoreService;
	}
}

/**
 * Service to retrieve or modify each player's score
 */
const ScoreService = Knit.CreateService({
	Name: "ScoreService",

	/**
	 * Map of every player's Score stat
	 */
	PlayerScores: new Map<Player, IntValue>(),

	Client: {
		/**
		 * Remote Signal to increment the player's score from the client
		 */
		ScoreEarned: new RemoteSignal<(score: number) => void>(),

		/**
		 * Retrieve the score of the player from the server.
		 *
		 * @param player
		 * @returns
		 */
		GetScore(player: Player) {
			return this.Server.GetScore(player);
		},
	},

	/**
	 * Increment the score of a given player by some amount
	 *
	 * @param player
	 * @param amount
	 */
	AddScore(player: Player, amount: number) {
		const scoreStat = this.PlayerScores.get(player);
		scoreStat!.Value += amount;
	},

	/**
	 * Retrieve the score of the player
	 *
	 * @param player
	 * @returns
	 */
	GetScore(player: Player) {
		const scoreStat = this.PlayerScores.get(player);
		return scoreStat!.Value ?? 0;
	},

	// Initialize
	KnitInit() {
		// Create new leaderstat for players on entry
		Players.PlayerAdded.Connect((player) => {
			const stats = new Instance("Folder");
			stats.Name = "leaderstats";
			stats.Parent = player;

			const scoreStat = new Instance("IntValue");
			scoreStat.Name = "Score";
			scoreStat.Value = 0;
			scoreStat.Parent = stats;

			this.PlayerScores.set(player, scoreStat);
		});

		// Remove leaderstat from service's map on exit
		Players.PlayerRemoving.Connect((player) => {
			this.PlayerScores.delete(player);
		});

		// Receive score changes from clients
		this.Client.ScoreEarned.Connect((player, score) => this.AddScore(player, score));

		print("ScoreService initialized!");
	},
});

export = ScoreService;
