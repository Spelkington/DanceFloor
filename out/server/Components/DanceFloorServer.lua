-- Compiled with roblox-ts v1.2.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit)
local Janitor = _knit.Janitor
local Timer = _knit.Timer
local GetPlayerFromPart = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "FunctionLibrary").GetPlayerFromPart
--[[
	*
	* Create the server-side logic for a Dance Floor instance that will track which
	* players are currently looking to party and play the Dance Floor minigame.
]]
local DanceFloorServer
do
	DanceFloorServer = setmetatable({}, {
		__tostring = function()
			return "DanceFloorServer"
		end,
	})
	DanceFloorServer.__index = DanceFloorServer
	function DanceFloorServer.new(...)
		local self = setmetatable({}, DanceFloorServer)
		return self:constructor(...) or self
	end
	function DanceFloorServer:constructor(instance)
		self.janitor = Janitor.new()
		self.timer = Timer.new(0.75, self.janitor)
		self.currentPlayers = {}
		self.LEAVE_RADIUS = 25
		local _arg0 = instance:IsA("Model")
		assert(_arg0)
		local _arg0_1 = instance:FindFirstChild("Detector")
		assert(_arg0_1)
		local detector = instance:FindFirstChild("Detector")
		-- Register players to the dance floor once they've touched
		-- the detector block.
		self.janitor:Add(detector.Touched:Connect(function(touched)
			local player = GetPlayerFromPart(touched)
			if player and not (self.currentPlayers[player] ~= nil) then
				self:onPlayerJoin(player)
			end
		end))
		-- Use the Timer to check every second which players have left
		-- the dance floor.
		self.timer.Tick:Connect(function()
			for instance in pairs(self.currentPlayers) do
				-- Assume the player set only contains players
				local player = instance
				self:checkPlayerExit(player, detector)
			end
		end)
		self.timer:Start()
	end
	function DanceFloorServer:onPlayerJoin(player)
		print("Player joined dancing:")
		print(player)
		-- ▼ Set.add ▼
		self.currentPlayers[player] = true
		-- ▲ Set.add ▲
		return nil
	end
	function DanceFloorServer:onPlayerExit(player)
		print("Player stopped dancing:")
		print(player)
		-- ▼ Set.delete ▼
		self.currentPlayers[player] = nil
		-- ▲ Set.delete ▲
		return nil
	end
	function DanceFloorServer:checkPlayerExit(player, detector)
		local _rootInst = player.Character
		if _rootInst ~= nil then
			_rootInst = _rootInst:FindFirstChild("HumanoidRootPart")
		end
		local rootInst = _rootInst
		if rootInst then
			-- TODO: Use a less expensive method for leave detection.
			local root = rootInst
			local _position = detector.Position
			local _position_1 = root.Position
			local distance = _position - _position_1
			if distance.Magnitude > self.LEAVE_RADIUS then
				self:onPlayerExit(player)
			end
		end
		return nil
	end
	function DanceFloorServer:Destroy()
		self.janitor:Destroy()
	end
	DanceFloorServer.Tag = "DanceFloor"
end
return DanceFloorServer
