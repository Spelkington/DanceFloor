import { KnitClient as Knit, Component } from "@rbxts/knit";
import { StarterPlayer } from "@rbxts/services";

Knit.Start();

Component.Auto(StarterPlayer.StarterPlayerScripts.TS.Components);

const ScoreService = Knit.GetService("ScoreService");
const MinigameService = Knit.GetService("MinigameService");
