import { KnitServer as Knit, Component } from "@rbxts/knit";
import { ServerScriptService } from "@rbxts/services";

Knit.AddServices(ServerScriptService.TS.Services);
Component.Auto(ServerScriptService.TS.Components);

Knit.Start();
