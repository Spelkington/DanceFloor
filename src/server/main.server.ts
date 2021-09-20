import { KnitServer as Knit, Component } from "@rbxts/knit";
import { ServerScriptService } from "@rbxts/services";

Knit.Start();

Component.Auto(ServerScriptService.TS.Components);
