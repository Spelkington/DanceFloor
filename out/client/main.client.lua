-- Compiled with roblox-ts v1.2.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit)
local Knit = _knit.KnitClient
local Component = _knit.Component
local StarterPlayer = TS.import(script, TS.getModule(script, "@rbxts", "services")).StarterPlayer
Knit.Start()
Component.Auto(StarterPlayer.StarterPlayerScripts.TS.Components)
