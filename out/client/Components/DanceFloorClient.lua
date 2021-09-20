-- Compiled with roblox-ts v1.2.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit)
local Timer = _knit.Timer
local Janitor = _knit.Janitor
local DanceFloorClient
do
	DanceFloorClient = setmetatable({}, {
		__tostring = function()
			return "DanceFloorClient"
		end,
	})
	DanceFloorClient.__index = DanceFloorClient
	function DanceFloorClient.new(...)
		local self = setmetatable({}, DanceFloorClient)
		return self:constructor(...) or self
	end
	function DanceFloorClient:constructor(instance)
		self.janitor = Janitor.new()
		self.timer = Timer.new(0.75, self.janitor)
		local _arg0 = instance:IsA("Model")
		assert(_arg0)
		local _arg0_1 = instance:FindFirstChild("ColorPads")
		assert(_arg0_1)
		local pads = instance:FindFirstChild("ColorPads")
		self.janitor:Add(self.timer.Tick:Connect(function()
			self:cycleColors(pads)
		end))
		self.timer:Start()
	end
	function DanceFloorClient:cycleColors(pads)
		for _, child in ipairs(pads:GetChildren()) do
			local pad = child
			pad.BrickColor = BrickColor.new(Color3.fromRGB(math.round(math.random()) * 255, math.round(math.random()) * 255, math.round(math.random()) * 255))
		end
	end
	function DanceFloorClient:Destroy()
		self.janitor:Destroy()
	end
	DanceFloorClient.Tag = "DanceFloor"
end
return DanceFloorClient
