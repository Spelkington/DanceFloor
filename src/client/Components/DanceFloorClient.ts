import { Component, Timer, Janitor } from "@rbxts/knit";

class DanceFloorClient implements Component.ComponentClass {
	public static Tag = "DanceFloor";

	private janitor = new Janitor();
	private timer = new Timer(0.75, this.janitor);

	constructor(instance: Instance) {
		assert(instance.IsA("Model"));
		assert(instance.FindFirstChild("ColorPads"));

		const pads = <Model>instance.FindFirstChild("ColorPads");

		this.janitor.Add(
			this.timer.Tick.Connect(() => {
				this.cycleColors(pads);
			}),
		);

		this.timer.Start();
	}

	/**
	 * Randomizes the color of all color pads on the dance floor
	 *
	 * @param pads Model instance containing all color pads to be randomized
	 */
	private cycleColors(pads: Model) {
		for (const child of pads.GetChildren()) {
			const pad = <BasePart>child;

			pad.BrickColor = new BrickColor(
				Color3.fromRGB(
					math.round(math.random()) * 255,
					math.round(math.random()) * 255,
					math.round(math.random()) * 255,
				),
			);
		}
	}

	public Destroy() {
		this.janitor.Destroy();
	}
}

export = DanceFloorClient;
