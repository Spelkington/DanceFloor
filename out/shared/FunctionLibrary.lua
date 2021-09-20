-- Compiled with roblox-ts v1.2.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Players = TS.import(script, TS.getModule(script, "@rbxts", "services")).Players
--[[
	*
	* Retrieves the Player owner of a BasePart within their character, if one exists.
	*
	* @param part The potential Player's Character part to be checked
	* @returns The player the part belongs to, OR undefined if no player was found.
]]
local function GetPlayerFromPart(part)
	local _humanoid = part.Parent
	if _humanoid ~= nil then
		_humanoid = _humanoid:FindFirstChild("Humanoid")
	end
	local humanoid = _humanoid
	if humanoid then
		local name = humanoid.Parent.Name
		local player = Players:FindFirstChild(name)
		return player
	else
		return nil
	end
end
return {
	GetPlayerFromPart = GetPlayerFromPart,
}
