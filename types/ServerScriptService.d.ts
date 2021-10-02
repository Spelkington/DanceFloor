interface ServerScriptService extends Instance {
	TS: Folder & {
		main: Script;
		Components: Folder & {
			DanceFloorServer: ModuleScript;
		};
		Services: Folder & {
			PointsService: ModuleScript;
		};
	};
}
