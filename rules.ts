import fs from "fs";
import type { KarabinerRules } from "./types";
import { app, createHyperSubLayers, open, rectangle, shell } from "./utils";

const rules: KarabinerRules[] = [
	// Define the Hyper key itself
	{
		description: "Backtick -> Control Key",
		manipulators: [
			{
				type: "basic",
				description: "Disable Ctrl+Y globally except in terminal apps",
				from: {
					key_code: "y",
					modifiers: {
						mandatory: ["control"],
					},
				},
				to: [], // Empty array means the key does nothing
				conditions: [
					{
						type: "frontmost_application_unless",
						bundle_identifiers: [
							"com.apple.Terminal",
							"com.googlecode.iterm2",
							"com.github.wez.wezterm",
							"net.kovidgoyal.kitty",
							"org.alacritty",
							"com.mitchellh.ghostty",
						],
					},
				],
			},
			{
				description: "Backtick -> Control Key",
				from: {
					key_code: "grave_accent_and_tilde",
				},
				to: [
					{
						key_code: "left_control",
					},
				],
				to_if_alone: [
					{
						key_code: "grave_accent_and_tilde",
					},
				],
				type: "basic",
			},
			{
				description: "Caps Lock -> Hyper Key",
				from: {
					key_code: "caps_lock",
					modifiers: {
						optional: ["any"],
					},
				},
				to: [
					{
						set_variable: {
							name: "hyper",
							value: 1,
						},
					},
				],
				to_after_key_up: [
					{
						set_variable: {
							name: "hyper",
							value: 0,
						},
					},
				],
				to_if_alone: [
					{
						key_code: "escape",
					},
				],
				type: "basic",
			},
			//      {
			//        type: "basic",
			//        description: "Disable CMD + Tab to force Hyper Key usage",
			//        from: {
			//          key_code: "tab",
			//          modifiers: {
			//            mandatory: ["left_command"],
			//          },
			//        },
			//        to: [
			//          {
			//            key_code: "tab",
			//          },
			//        ],
			//      },
			{
				description: "F6 -> Single monitor chat setup",
				from: {
					key_code: "f6",
				},
				to: [
					{
						shell_command: "open 'raycast://customWindowManagementCommand?&name=Single%20monitor%20chat%20setup'",
					},
				],
				type: "basic",
			},
		],
	},
	...createHyperSubLayers({
		// spacebar: open(
		//   "raycast://extensions/stellate/mxstbr-commands/create-notion-todo"
		// ),
		// b = "B"rowse
		b: {
			t: open("https://twitter.com"),
			// Quarterly "P"lan
			y: open("https://www.youtube.com"),
			f: open("https://facebook.com"),
			r: open("https://reddit.com"),
			g: open("https://mail.google.com"),
			h: open("https://github.com"),
		},
		// o = "Open" applications
		o: {
			1: app("1Password"),
			b: app("Brave Browser"),
			// m: app("Microsoft Outlook"),
			m: app("Notion Mail"),
			n: app("Notion"),
			// Notion
			c: app("Notion Calendar"),
			// Code
			v: app("Visual Studio Code"),
			x: app("Neovide"),
			w: app("WebStorm"),
			j: app("IntelliJ IDEA Ultimate"),
			r: app("RustRover"),
			k: app("OrbStack"),
			g: app("GoLand"),
			p: app("PyCharm"),
			u: app("Termius"),
			y: app("Yaak"),
			// Chat
			i: app("Messenger"),
			d: app("Legcord"),
			z: app("Zalo"),
			l: app("Telegram Lite"),
			t: app("Microsoft Teams"),
			// Open todo list managed via *H*ypersonic
			h: open("raycast://extensions/reboot/hypersonic/index"),
			f: app("Finder"),
			s: app("Music"),
		},

		// [TODO] - This doesn't quite work yet.
		// l = "Layouts" via Raycast's custom window management
		l: {
			// Coding layout
			c: shell`
        open -a "Visual Studio Code.app"
        sleep 0.2
        open -g "raycast://customWindowManagementCommand?position=topLeft&relativeWidth=0.5"
      `,
		},

		// w = "Window" via rectangle.app
		w: {
			semicolon: {
				description: "Window: Hide",
				to: [
					{
						key_code: "h",
						modifiers: ["right_command"],
					},
				],
			},
			y: rectangle("previous-display"),
			o: rectangle("next-display"),
			k: rectangle("top-half"),
			j: rectangle("bottom-half"),
			h: rectangle("left-half"),
			l: rectangle("right-half"),
			f: rectangle("maximize"),
			// f: open("raycast://extensions/raycast/window-management/maximize"),
			c: rectangle("center"),
			u: {
				description: "Window: Previous Tab",
				to: [
					{
						key_code: "tab",
						modifiers: ["right_control", "right_shift"],
					},
				],
			},
			i: {
				description: "Window: Next Tab",
				to: [
					{
						key_code: "tab",
						modifiers: ["right_control"],
					},
				],
			},
			n: {
				description: "Window: Next Window",
				to: [
					{
						key_code: "grave_accent_and_tilde",
						modifiers: ["right_command"],
					},
				],
			},
			b: {
				description: "Window: Back",
				to: [
					{
						key_code: "open_bracket",
						modifiers: ["right_command"],
					},
				],
			},
			// Note: No literal connection. Both f and n are already taken.
			m: {
				description: "Window: Forward",
				to: [
					{
						key_code: "close_bracket",
						modifiers: ["right_command"],
					},
				],
			},
			d: {
				description: "Window: Next desktop",
				to: [
					{
						key_code: "right_arrow",
						modifiers: ["right_control", "right_command"],
					},
				],
			},
		},
		// t = "Toggle"
		t: {
			b: open(
				"raycast://extensions/huzef44/keyboard-brightness/toggle-keyboard-brightness",
			),
			k: open("raycast://extensions/henrikruscon/klack/toggleKlack"),
			// "D"o not disturb toggle
			d: open(
				`raycast://extensions/yakitrak/do-not-disturb/toggle?launchType=background`,
			),
		},
		// f = "Find"
		f: {
			j: open("raycast://extensions/gdsmith/jetbrains/recent"),
			v: open("raycast://extensions/thomas/visual-studio-code/index"),
			m: open("raycast://extensions/raycast/navigation/search-menu-items"),
			s: open(
				"raycast://extensions/louishuyng/tmux-sessioner/manage_tmux_windows",
			),
			r: open("raycast://extensions/raycast/file-search/search-files"),
			b: open("raycast://extensions/raycast/browser-bookmarks/index"),
			// t: open("raycast://extensions/plonq/orion/tabs"),
			// h: open("raycast://extensions/plonq/orion/history"),
			// t: open("raycast://extensions/loris/safari/cloud-tabs"),
			// h: open("raycast://extensions/loris/safari/search-history"),
			// t: open("raycast://extensions/the-browser-company/arc/search-tabs"),
			// h: open("raycast://extensions/the-browser-company/arc/search-history"),
		},
		// s = "System"
		s: {
			f: open("raycast://extensions/raycast/file-search/search-files"),
			u: {
				to: [
					{
						key_code: "volume_increment",
					},
				],
			},
			j: {
				to: [
					{
						key_code: "volume_decrement",
					},
				],
			},
			i: {
				to: [
					{
						key_code: "display_brightness_increment",
					},
				],
			},
			k: {
				to: [
					{
						key_code: "display_brightness_decrement",
					},
				],
			},
			l: {
				to: [
					{
						key_code: "q",
						modifiers: ["right_control", "right_command"],
					},
				],
			},
			p: {
				to: [
					{
						key_code: "play_or_pause",
					},
				],
			},
			semicolon: {
				to: [
					{
						key_code: "fastforward",
					},
				],
			},
			close_bracket: {
				to: [
					{
						key_code: "fastforward",
					},
				],
			},
			open_bracket: {
				to: [
					{
						key_code: "rewind",
					},
				],
			},
			e: open(
				`raycast://extensions/thomas/elgato-key-light/toggle?launchType=background`,
			),
			// "D"o not disturb toggle
			d: open(
				`raycast://extensions/yakitrak/do-not-disturb/toggle?launchType=background`,
			),
			// "T"heme
			// t: open(`raycast://extensions/raycast/system/toggle-system-appearance`),
			c: open("raycast://extensions/raycast/system/open-camera"),
			b: open(
				"raycast://extensions/huzef44/keyboard-brightness/toggle-keyboard-brightness",
			),
			m: open("raycast://extensions/raycast/system/toggle-mute"),
			t: open("raycast://extensions/raycast/translator/translate"),
		},

		// v = "moVe" which isn't "m" because we want it to be on the left hand
		// so that hjkl work like they do in vim
		v: {
			h: {
				to: [{ key_code: "left_arrow" }],
			},
			j: {
				to: [{ key_code: "down_arrow" }],
			},
			k: {
				to: [{ key_code: "up_arrow" }],
			},
			l: {
				to: [{ key_code: "right_arrow" }],
			},
			// Magicmove via homerow.app
			// m: {
			//   to: [{ key_code: "f", modifiers: ["right_control"] }],
			//   // TODO: Trigger Vim Easymotion when VSCode is focused
			// },
			// Scroll mode via homerow.app
			s: {
				to: [{ key_code: "j", modifiers: ["right_control"] }],
			},
			d: {
				to: [{ key_code: "d", modifiers: ["right_shift", "right_command"] }],
			},
			u: {
				to: [{ key_code: "page_down" }],
			},
			i: {
				to: [{ key_code: "page_up" }],
			},
		},

		// Controlling arrow like combo arrow key
		// [FIXME] - This doesn't work yet. (don't know why)
		a: {
			j: {
				to: [{ key_code: "left_arrow" }],
			},
			k: {
				to: [{ key_code: "down_arrow" }],
			},
			i: {
				to: [{ key_code: "up_arrow" }],
			},
			l: {
				to: [{ key_code: "right_arrow" }],
			},
		},

		// Clipboard history
		c: {
			// Using Raycast's clipboard history will not work with Karabiner because it will always pop up the AI chat history
			// h: open(
			// 	"raycast://extensions/raycast/clipboard-history/clipboard-history",
			// ),
			g: app("Tower"),
		},
		// r = "Raycast"
		r: {
			c: open("raycast://extensions/thomas/color-picker/pick-color"),
			n: open("raycast://script-commands/dismiss-notifications"),
			// l: open(
			//   "raycast://extensions/stellate/mxstbr-commands/create-mxs-is-shortlink"
			// ),
			e: open(
				"raycast://extensions/raycast/emoji-symbols/search-emoji-symbols",
			),
			p: open("raycast://extensions/raycast/raycast/confetti"),
			// a: open("raycast://extensions/raycast/raycast-ai/ai-chat"),
			s: open("/System/Applications/Utilities/Screenshot.app"),
			// s: open("/System/Applications/Utilities/Screenshot.app"),
			h: open(
				"raycast://extensions/raycast/clipboard-history/clipboard-history",
			),
			j: open("raycast://extensions/gdsmith/jetbrains/recent"),
			f: open("raycast://extensions/raycast/file-search/search-files"),
			t: open("raycast://extensions/raycast/translator/translate"),
			a: open("raycast://extensions/raycast/raycast-ai/ai-chat"),
		},
	}),
	// {
	//   description: "Change Backspace to Spacebar when Minecraft is focused",
	//   manipulators: [
	//     {
	//       type: "basic",
	//       from: {
	//         key_code: "delete_or_backspace",
	//       },
	//       to: [
	//         {
	//           key_code: "spacebar",
	//         },
	//       ],
	//       conditions: [
	//         {
	//           type: "frontmost_application_if",
	//           file_paths: [
	//             "^/Users/mxstbr/Library/Application Support/minecraft/runtime/java-runtime-gamma/mac-os-arm64/java-runtime-gamma/jre.bundle/Contents/Home/bin/java$",
	//           ],
	//         },
	//       ],
	//     },
	//   ],
	// },
];

fs.writeFileSync(
	"karabiner.json",
	JSON.stringify(
		{
			global: {
				show_in_menu_bar: true,
			},
			profiles: [
				{
					name: "Default",
					complex_modifications: {
						rules,
					},
				},
			],
		},
		null,
		2,
	),
);
