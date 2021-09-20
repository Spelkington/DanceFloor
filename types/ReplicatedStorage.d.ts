interface ReplicatedStorage extends Instance {
	TS: Folder & {
		module: ModuleScript;
	};
	rbxts_include: Folder & {
		RuntimeLib: ModuleScript;
		Promise: ModuleScript;
		node_modules: Folder & {
			knit: Folder & {
				Knit: ModuleScript & {
					KnitServer: ModuleScript;
					Version: StringValue;
					Util: Folder & {
						Promise: ModuleScript;
						Streamable: ModuleScript;
						Option: ModuleScript;
						Ser: ModuleScript;
						Remote: Folder & {
							RemoteProperty: ModuleScript;
							RemoteSignal: ModuleScript;
							ClientRemoteProperty: ModuleScript;
							ClientRemoteSignal: ModuleScript;
						};
						Timer: ModuleScript;
						Component: ModuleScript;
						StreamableUtil: ModuleScript;
						EnumList: ModuleScript;
						Loader: ModuleScript;
						Janitor: ModuleScript;
						Symbol: ModuleScript;
						TableUtil: ModuleScript;
						Signal: ModuleScript;
					};
					KnitClient: ModuleScript;
				};
			};
			services: ModuleScript;
			roact: Folder & {
				src: ModuleScript & {
					createSpy: ModuleScript;
					createSignal: ModuleScript;
					oneChild: ModuleScript;
					Component: ModuleScript;
					createElement: ModuleScript;
					createReconciler: ModuleScript;
					GlobalConfig: ModuleScript;
					strict: ModuleScript;
					createRef: ModuleScript;
					Type: ModuleScript;
					Portal: ModuleScript;
					Symbol: ModuleScript;
					PropMarkers: Folder & {
						Ref: ModuleScript;
						Change: ModuleScript;
						Children: ModuleScript;
						Event: ModuleScript;
					};
					ComponentLifecyclePhase: ModuleScript;
					Config: ModuleScript;
					assign: ModuleScript;
					assertDeepEqual: ModuleScript;
					getDefaultInstanceProperty: ModuleScript;
					Binding: ModuleScript;
					NoopRenderer: ModuleScript;
					forwardRef: ModuleScript;
					internalAssert: ModuleScript;
					createReconcilerCompat: ModuleScript;
					createFragment: ModuleScript;
					RobloxRenderer: ModuleScript;
					PureComponent: ModuleScript;
					invalidSetStateMessages: ModuleScript;
					ElementKind: ModuleScript;
					createContext: ModuleScript;
					Logging: ModuleScript;
					ElementUtils: ModuleScript;
					SingleEventManager: ModuleScript;
					None: ModuleScript;
				};
			};
			["compiler-types"]: Folder & {
				types: Folder;
			};
			types: Folder & {
				include: Folder & {
					generated: Folder;
				};
			};
		};
	};
}
