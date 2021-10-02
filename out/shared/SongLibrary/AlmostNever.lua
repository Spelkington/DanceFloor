-- Compiled with roblox-ts v1.2.3
local AlmostNever
do
	AlmostNever = setmetatable({}, {
		__tostring = function()
			return "AlmostNever"
		end,
	})
	AlmostNever.__index = AlmostNever
	function AlmostNever.new(...)
		local self = setmetatable({}, AlmostNever)
		return self:constructor(...) or self
	end
	function AlmostNever:constructor()
		self.SongID = "rbxassetid://6566675228"
		self.Resolution = 192
		self.Data = { 192, 672, 1152, 1872, 2304, 2496, 3264, 3456, 3840, 4320, 4608, 4992, 5184, 5568, 6144, 6624, 7104, 7680, 8448, 9408, 9984, 10464, 11136, 11520, 12096, 12480, 12864, 13248, 14016, 14208, 14592, 15168, 15840, 16512, 17280, 17664, 18240, 18624, 19008, 19392, 20064, 20352, 20736, 21120, 21504, 22272, 22464, 23040, 23232, 23904 }
	end
end
return {
	AlmostNever = AlmostNever,
}
