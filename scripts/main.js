Events.on(ClientLoadEvent, () => {
	const iconPicker = new BaseDialog("Icon Picker");
	/* Yes there is no simpler way */
	const icons = "".split("");
	iconPicker.addCloseButton();
	/* Copy all button */
	iconPicker.buttons.button("Copy All", Icon.copy, Styles.defaultt, () => {
		Core.app.setClipboardText(icons.join(""));
		Vars.ui.showInfoFade("Copied all icons.");
		iconPicker.hide();
	}).size(210, 64);
	/* Copy by name button */
	iconPicker.buttons.button("Get By Name", Icon.copy, Styles.defaultt, () => {
		Vars.ui.showTextInput("Names are gray text under translated name in block info.\nThey must be lower cased and with '-' instead of spaces.\nExamples: phase-wall, ore-copper", "Name:", "", name => {
			if(Fonts.getUnicode(name) == 0) {
				Vars.ui.showInfo("[red]'"+name+"' is an invalid name.");
			} else {
				/* is this legal? */
				let ch = eval("'\\u" + Fonts.getUnicode(name).toString(16) + "'");
				Core.app.setClipboardText(ch);
				Vars.ui.showInfoFade("Copied: "+ch+".");
				iconPicker.hide();
			};
		});
	}).size(210, 64);
	/* Dialog builder */
	let i = 0;
	icons.forEach(ch => {
		/* illegal eval use */
		eval("iconPicker.cont.button(ch, Styles.defaultt, () => {Vars.ui.showInfoFade('Copied: "+ch+".'); Core.app.setClipboardText('"+ch+"'); iconPicker.hide()}).size(40, 40)");
		if((i+1)%20 == 0 && i > 0) {
			iconPicker.cont.row();
		};
		i++;
	});
	/* GUI */
	// I dont know how to make that button in game, so ill put that here for now
	Vars.ui.paused.buttons.button("Icon Picker", Icon.pick, () => iconPicker.show()).size(210, 64);
});