-- Compiled with roblox-ts v1.2.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit)
local Knit = _knit.KnitServer
local RemoteSignal = _knit.RemoteSignal
local Players = TS.import(script, TS.getModule(script, "@rbxts", "services")).Players
--[[
	*
	* Service to retrieve or modify each player's score
]]
local ScoreService = Knit.CreateService({
	Name = "ScoreService",
	PlayerScores = {},
	Client = {
		ScoreEarned = RemoteSignal.new(),
		GetScore = function(self, player)
			return self.Server:GetScore(player)
		end,
	},
	AddScore = function(self, player, amount)
		local scoreStat = self.PlayerScores[player]
		scoreStat.Value += amount
	end,
	GetScore = function(self, player)
		local scoreStat = self.PlayerScores[player]
		local _condition = scoreStat.Value
		if _condition == nil then
			_condition = 0
		end
		return _condition
	end,
	KnitInit = function(self)
		-- Create new leaderstat for players on entry
		Players.PlayerAdded:Connect(function(player)
			local stats = Instance.new("Folder")
			stats.Name = "leaderstats"
			stats.Parent = player
			local scoreStat = Instance.new("IntValue")
			scoreStat.Name = "Score"
			scoreStat.Value = 0
			scoreStat.Parent = stats
			-- ▼ Map.set ▼
			self.PlayerScores[player] = scoreStat
			-- ▲ Map.set ▲
		end)
		-- Remove leaderstat from service's map on exit
		Players.PlayerRemoving:Connect(function(player)
			-- ▼ Map.delete ▼
			self.PlayerScores[player] = nil
			-- ▲ Map.delete ▲
		end)
		-- Receive score changes from clients
		self.Client.ScoreEarned:Connect(function(player, score)
			return self:AddScore(player, score)
		end)
		print("ScoreService initialized!")
	end,
})
return ScoreService
