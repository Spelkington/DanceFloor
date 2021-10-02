-- Compiled with roblox-ts v1.2.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit)
local Timer = _knit.Timer
local Janitor = _knit.Janitor
local AlmostNever = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "SongLibrary", "AlmostNever").AlmostNever
local LocalPlayer = game:GetService("Players").LocalPlayer
local PlayerGui = LocalPlayer:FindFirstChildOfClass("PlayerGui")
local DanceMinigame
do
	DanceMinigame = setmetatable({}, {
		__tostring = function()
			return "DanceMinigame"
		end,
	})
	DanceMinigame.__index = DanceMinigame
	function DanceMinigame.new(...)
		local self = setmetatable({}, DanceMinigame)
		return self:constructor(...) or self
	end
	function DanceMinigame:constructor(instance)
		self.janitor = Janitor.new()
		self.gui = Instance.new("ScreenGui")
		self.timer = Timer.new(1, self.janitor)
		self.musicNotes = {}
		self.activeNotes = {}
		self.expiredNotes = {}
		self.song = AlmostNever.new()
		self.music = Instance.new("Sound")
		local _arg0 = instance:IsA("ScreenGui")
		assert(_arg0)
		self.gui = instance
		self.gui.MusicNote.Visible = false
		self:startSong("test title TODO change later")
		print("DanceMinigame started!")
	end
	function DanceMinigame:startSong(title)
		-- TODO: Actually load the song.
		self.music = Instance.new("Sound")
		self.music.Parent = LocalPlayer
		self.music.SoundId = self.song.SongID
		local speedMultiplier = 2
		local sourceTick = 0.00251
		local accuracy = 0.1
		local adjustedTick = sourceTick / accuracy
		local tickOffset = 0
		-- Reset to a new timer
		self.timer:Destroy()
		self.timer = Timer.new(adjustedTick, self.janitor)
		local noteIndex = 0
		local tick = 0
		local lastTime = DateTime.now().UnixTimestampMillis
		self.timer.Tick:Connect(function()
			if tick + tickOffset >= self.song.Data[noteIndex + 1] then
				local time = DateTime.now().UnixTimestampMillis
				local elapsedTicks = (time - lastTime) / (sourceTick * 1000)
				print({ elapsedTicks, tick + tickOffset, self.song.Data[noteIndex + 1] })
				self:startNote()
				noteIndex += 1
			end
			-- for (const note of this.musicNotes) {
			-- note.Position = note.Position.add(new UDim2(adjustedTick / speedMultiplier, 0, 0, 0));
			-- if (note.Position.X.Scale > 1) {
			-- note.Destroy();
			-- }
			-- }
			tick += 1 / accuracy
		end)
		self.music:Play()
		self.timer:Start()
		print("Song Started!")
	end
	function DanceMinigame:startNote()
		local newNote = self.gui.MusicNote:Clone()
		newNote.Parent = self.gui
		newNote.Visible = true
		newNote.Name = "Note"
		newNote.Position = UDim2.new(0, 0, newNote.Position.Y.Scale, 0)
		local _musicNotes = self.musicNotes
		-- ▼ Array.push ▼
		_musicNotes[#_musicNotes + 1] = newNote
		-- ▲ Array.push ▲
		print("Note Created!")
	end
	function DanceMinigame:Destroy()
		self.janitor:Destroy()
	end
	DanceMinigame.Tag = "DanceMinigame"
end
return DanceMinigame
