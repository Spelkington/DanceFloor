import { Players } from "@rbxts/services";

/**
 * Retrieves the Player owner of a BasePart within their character, if one exists.
 *
 * @param part The potential Player's Character part to be checked
 * @returns The player the part belongs to, OR undefined if no player was found.
 */
function GetPlayerFromPart(part: BasePart): Player | undefined {
	const humanoid = part.Parent?.FindFirstChild("Humanoid");
	if (humanoid) {
		const name = humanoid.Parent!.Name;
		const player = <Player | undefined>Players.FindFirstChild(name);
		return player;
	} else {
		return undefined;
	}
}

export { GetPlayerFromPart };
