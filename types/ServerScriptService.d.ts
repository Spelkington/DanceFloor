interface ServerScriptService extends Instance {
	TS: Folder & {
		main: Script;
		Components: Folder & {
			Lava: ModuleScript;
		};
	};
}
