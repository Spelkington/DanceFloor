-- Compiled with roblox-ts v1.2.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit)
local Knit = _knit.KnitServer
local RemoteSignal = _knit.RemoteSignal
local ServerStorage = TS.import(script, TS.getModule(script, "@rbxts", "services")).ServerStorage
--[[
	*
	* Service to send minigames to players.
]]
local MinigameService = Knit.CreateService({
	Name = "MinigameService",
	MinigameStorage = ServerStorage.Minigames,
	PlayerMinigames = {},
	Client = {
		ExitMinigame = RemoteSignal.new(),
	},
	StartMinigameForPlayer = function(self, player, gameName)
		-- If the player is currently already playing a minigame,
		-- destroy it.
		if self.PlayerMinigames[player] ~= nil then
			self:ExitMinigameForPlayer(player)
		end
		-- Clone the target minigame into the player's GUI
		local source = self.MinigameStorage:FindFirstChild(gameName)
		local minigame = source:Clone()
		minigame.Parent = player:FindFirstChild("PlayerGui")
		-- Track the minigame in the object map
		-- ▼ Map.set ▼
		self.PlayerMinigames[player] = minigame
		-- ▲ Map.set ▲
	end,
	ExitMinigameForPlayer = function(self, player)
		local minigame = self.PlayerMinigames[player]
		minigame:Destroy()
		-- ▼ Map.delete ▼
		self.PlayerMinigames[player] = nil
		-- ▲ Map.delete ▲
	end,
	KnitInit = function(self)
		print("MinigameService initialized!")
	end,
})
return MinigameService
