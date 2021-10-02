-- Compiled with roblox-ts v1.2.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit)
local Knit = _knit.KnitServer
local Component = _knit.Component
local ServerScriptService = TS.import(script, TS.getModule(script, "@rbxts", "services")).ServerScriptService
Knit.AddServices(ServerScriptService.TS.Services)
Component.Auto(ServerScriptService.TS.Components)
Knit.Start()
