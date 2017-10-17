// Scribe 0.6
// Kendall Purser 11/03/2016
//

var scribe = {
	default : {
		view : "project", // project, scene, character, setting, print
		project : 0, // index in data of project last opened
		scene : 0, // index of scene in project last opened
		note : 0, // note in project last opened
		nav : "project",
		backimg : "https://cdn.morguefile.com/imageData/public/files/r/revwarheart/10/l/1414391237k1mz6.jpg",
		night : 0, // 0 = white back, black text; 1 = Black back, white text
		sprint_word_count : 0, // set a benchmark to compare the project word count to
		split : 0 // allow two divs to be seen at the same time: 0 no, 1 notes, 2 preview 
	},
	tabs : ["project", "outline", "scene", "notes", "preview", "tools", "settings" ], //"setting"
	template : [
		"<div class='outline_row {{styles}}'>\r\n<a onclick='scribe.load_scene({{id_0}});'>{{title}}</a> ({{wordcount}} words)<br />\r\n<a class='btn' onclick=\"scribe.scene_up({{id_1}});\" alt=\"Move Up\">&uarr;</a>\r\n <a class='btn' onclick=\"scribe.scene_down({{id_2}});\" alt=\"Move Down\">&darr;</a>\r\n</div>"
	],
	init : function () {
		// let's get things started!
		scribe.load_settings();
		scribe.load_current_projects();
		scribe.nav(scribe.default.nav);
		scribe.load_project_notes();
		scribe.load_print_view();
		scribe.sprint_check();
		scribe.scene_word_count();

		// set background image
		if (scribe.default.backimg[0] != "#"){
			document.getElementById("s_background").style.backgroundImage= "url("+scribe.default.backimg +")";
		} else {
			document.getElementById("s_background").style.backgroundImage= "none";
			document.getElementById("s_background").style.backgroundColor= scribe.default.backimg;
			console.log(scribe.default.backimg);
		}
		
	},
	back_img : function () {
		// check values from the form
		var tmp_hex_back = a.get("hex_background").value;
		var tmp_web_back = a.get("web_background").value;
		var tmp_backimg = "";

		if (tmp_hex_back != "") {
			tmp_backimg = tmp_hex_back;
		}
		if (tmp_web_back != ""){
			tmp_backimg = tmp_web_back;
		}
		
		// put in default and save settings
		scribe.default.backimg = tmp_backimg;
		scribe.save_settings();
		scribe.init();
		console.log(tmp_backimg);
	},
	night : function () {
		// add night styles if 0

		// remove night styles if 1
	},
		// change scene view
	scene_mode : function (num_in) {
		if (scribe.default.split === 1) {
			// 0 = turn off focus mode
			scribe.default.split = 0;
		} else {
			// 1 = turn on focus mode
			scribe.default.split = 1;
		}
		scribe.save_settings();
		scribe.save_project();
		scribe.init();
	},
	/*
	nav : function (id_in) {
		// clear split mode if on and navigation happens
		if (scribe.default.focus > 0) {
			// make panes half width
			a.get("scene").className = "pane show focus";
			a.get("notes").className = "pane show focus";
			a.get("preview").className = "pane show focus";
			a.get("s_text").cols = "127";
			a.get("s_text").rows = "26";
		} else {
			// return scene to default settings
			a.get("scene").className = "pane show";
			a.get("s_text").cols = "64";
			a.get("s_text").rows = "20";
			
		}
		// use normal navigation
		scribe.go_nav(id_in);
	},
	*/
	nav : function (id) {
		scribe.default.nav = id;
		var tmp = scribe.tabs;

		for (i = 0; i < tmp.length; i+= 1) {
			a.get(tmp[i]).className = "hide";
			a.get(tmp[i] + "_btn").className = "btn";
		}
		a.get(id).className = "pane show";
		a.get(id + "_btn").className = "btn btn_select";
		scribe.save_settings();
	},
	goal_check : function() {
		// check for project and chapter goals
		for (i = 0; i < scribe.data.length; i += 1) {
			if (scribe.data[i].hasOwnProperty("p_goal") == false) {
				scribe.data[i].p_goal = 50000;
			}
			if (scribe.data[i].hasOwnProperty("p_ch_goal") == false) {
				scribe.data[i].p_goal = 2000;
			}
		}
	},
	sprint_check : function () {
		if (scribe.default.hasOwnProperty("sprint_word_count") === false) {
			scribe.default.sprint_word_count = 0;
		}
	},
	sprint_reset : function () {
		scribe.default.sprint_word_count = a.get("p_word_count").innerHTML;
		scribe.save_settings();
		scribe.init();
	},
	save_settings : function () {
		// parse through settings and turn into a string
		a.save("scribe_settings", scribe.default);
	},
	load_settings : function () {
		// load settings from localStorage if available
		if (a.read("scribe_settings") !== undefined){
			scribe.default = a.read("scribe_settings");
		}
	},
	load_current_projects : function () {
		// load current projects from browser memory
		if (a.read("scribe_data") !== null){
			scribe.data = a.read("scribe_data");
		}

		// update list on Project screen
		var tmp_options = "";

		for (i = 0; i < scribe.data.length; i += 1) {
			if (i !== scribe.default.project) {
				tmp_options += "<option value=\"" + i + "\" >" + scribe.data[i].p_title + "</option>\r\n";
			} else {
				tmp_options += "<option value=\"" + i + "\" selected>" + scribe.data[i].p_title + "</option>";
			}
		}
		a.get("p_select").innerHTML = tmp_options;

		// load default project
		scribe.load_project(scribe.default.project);
	},
	save_current_projects : function () {
		// save current projects to browser memory
		a.save("scribe_data", scribe.data);
	},
	purge_memory : function () {
		// if the browser is overwriting things for some reason
		a.clear("scribe_data");
		a.clear("scribe_settings");
		console.log("memory purged");
		scribe.init();
	},
	purge_settings : function () {
		var tmp_default = {
			view : "project", // project, scene, character, setting, print
			project : 0, // index in data of project last opened
			scene : 0, // index of scene in project last opened
			note : 0, // note in project last opened
			nav : "project",
			backimg : "https://cdn.morguefile.com/imageData/public/files/r/revwarheart/10/l/1414391237k1mz6.jpg",
			night : 0, // 0 = white back, black text; 1 = Black back, white text
			sprint_word_count : 0, // set a benchmark to compare the project word count to
			split : 0 // allow two divs to be seen at the same time: 0 no, 1 notes, 2 preview 

		};
		a.clear('scribe_settings');
		scribe.default = tmp_default;
		scribe.save_settings();
		scribe.init();
	},
	get_date : function () {
		var tmp_date = new Date(); 
		return tmp_date.toLocaleString();
	},

	// Project Functions
	load_project : function (value) {
		// load the project view with the selected project
		var tmp_p = scribe.data[value];
		
		// set default for scene, character, and setting if different than default project
		if (scribe.default.project !== value) {
			scribe.default.project = value;
			scribe.default.scene = 0;
			scribe.default.note = 0;
			scribe.save_settings();
		}
		
		a.get("p_title").value = tmp_p.p_title;
		a.get("p_author").value = tmp_p.p_author;
		a.get("p_lastdate").innerHTML = tmp_p.p_lastdate;
		a.get("p_scene_num").innerHTML = tmp_p.p_scenes.length;

		// calculate project wordcount
		var tmp_wc = 0;
		var i = 0;
		for (i = 0; i < tmp_p.p_scenes.length; i += 1) {
			tmp_wc += scribe.word_count(tmp_p.p_scenes[i].s_text);
		}
		tmp_p.p_wordcount = tmp_wc;
		a.get("p_word_count").innerHTML = tmp_p.p_wordcount;
		a.get("p_word_count2").innerHTML = tmp_p.p_wordcount;
		a.get("sprint_word_count").innerHTML = tmp_p.p_wordcount - scribe.default.sprint_word_count;

		// load scenes into outline
		var tmp_outline = "";
		var i = 0;
		for (i = 0; i < tmp_p.p_scenes.length; i += 1) {
			var tmp_tmpl = scribe.template[0];
			tmp_tmpl = tmp_tmpl.replace("{{title}}",tmp_p.p_scenes[i].s_title);
			tmp_tmpl = tmp_tmpl.replace("{{id_0}}",i);
			tmp_tmpl = tmp_tmpl.replace("{{id_1}}",i);
			tmp_tmpl = tmp_tmpl.replace("{{id_2}}",i);

			// wordcount
			tmp_tmpl = tmp_tmpl.replace("{{wordcount}}",scribe.word_count(tmp_p.p_scenes[i].s_text));
			if (scribe.word_count(tmp_p.p_scenes[i].s_text) === 0){
				tmp_tmpl = tmp_tmpl.replace("{{styles}}","red_back");
			} else {
				tmp_tmpl = tmp_tmpl.replace("{{styles}}","");
			}
			tmp_outline += tmp_tmpl;
		}
		a.get("outline_stage").innerHTML = tmp_outline;

		// load all other tabs
		var tmp_p = scribe.data[scribe.default.project];
		var tmp_s =	tmp_p.p_scenes[scribe.default.scene];

		a.get("s_title").value = tmp_s.s_title;
		a.get("s_purpose").value = tmp_s.s_purpose;
		a.get("s_characters").value = tmp_s.s_characters;
		a.get("s_lastdate").innerHTML = tmp_s.s_lastdate;
		a.get("s_text").value = tmp_s.s_text;
		a.get("s_word_count").innerHTML = scribe.word_count(tmp_s.s_text);
		scribe.load_project_scenes("s_select");
		//scribe.load_project_scenes("");

		// different data structure for characters and settings

		scribe.load_project_notes();
		scribe.load_note(scribe.default.note);

		scribe.load_print_view();
	},
	scene_up : function (num) {
		var tmp_outline = scribe.data[scribe.default.project].p_scenes;
		var tmp_holder = tmp_outline[num];
		if (num !== 0){
			tmp_outline[num] = tmp_outline[num-1];
			tmp_outline[num-1] = tmp_holder;
			scribe.save_current_projects();
			scribe.init();
		}
	},
	scene_down : function (num) {
		var tmp_outline = scribe.data[scribe.default.project].p_scenes;
		var tmp_holder = tmp_outline[num];
		if (num !== tmp_outline.length - 1) {
			tmp_outline[num] = tmp_outline[num + 1];
			tmp_outline[num + 1] = tmp_holder;
			scribe.save_current_projects();
			scribe.init();
		}		
	},
	save_project : function () {
		// load any changes from the UI to the project file
		// saves everything currently open, so all save buttons call this function
		var tmp_p = scribe.data[scribe.default.project];
		var tmp_s =	tmp_p.p_scenes[scribe.default.scene];
		var tmp_n =	tmp_p.p_notes;

		tmp_p.p_lastdate = scribe.get_date();
		tmp_p.p_title = a.get("p_title").value;
		tmp_p.p_author = a.get("p_author").value;

		tmp_s.s_title = a.get("s_title").value;
		tmp_s.s_purpose = a.get("s_purpose").value;
		tmp_s.s_characters = a.get("s_characters").value;
		tmp_s.s_lastdate = tmp_p.p_lastdate;
		tmp_s.s_text = a.get("s_text").value;

		// different data structure for notes

		tmp_n[scribe.default.note][0] = a.get("note_name").value;
		tmp_n[scribe.default.note][2] = a.get("note_text").value;
		
		// save them and show them
		scribe.save_current_projects();
		scribe.save_settings();
		scribe.init();
	},
	delete_project : function () {
		if (confirm("Delete project?")) {
			if (scribe.default.project !== 0){
				scribe.data.splice(scribe.default.project,1);
				scribe.save_current_projects();
				if (scribe.default.project > scribe.data.length-1){
					scribe.default.project = 0;
					scribe.save_settings();
				}
				scribe.init();
			}	
		}
	},
	new_project : function () {
		// create a new project within the data object
		var tmp_title = prompt("What would you like to name your new project?", "New Project" + scribe.data.length);
		if (tmp_title != null) {
			scribe.default.project = scribe.data.length;
			scribe.default.scene = 0;
			scribe.data.push({
				p_title : tmp_title,
				p_author : "",
				p_createdate : scribe.get_date(),
				p_lastdate : scribe.get_date(),
				p_wordcount : 0,
				p_scenes : [{
					s_lastdate : scribe.get_date(),
					s_title : "blank scene",
					s_purpose : "",
					s_characters : "",
					s_text : ""
				}],
				p_notes : [ // [name,category,text] 
					["Brainstorm","Note","What do I want to write today?"],

				]
			});
			scribe.save_settings();
			scribe.save_current_projects();
			scribe.init(); 
			// This is not loading the new project like it should. Previous project is still loaded in Scenes, preview, and notes.
		}
	},
	duplicate_project : function () {
		var tmp_project = scribe.data[scribe.default.project];

		// duplicate project and change current project id
		scribe.default.project = scribe.data.length;
		scribe.data.push(tmp_project);
		scribe.save_current_projects();
		scribe.save_settings();
		scribe.init();

		// load the duplicate and change the title to include (copy)
		tmp_project = scribe.data[scribe.default.project];
		tmp_project.p_title = tmp_project.p_title + " (copy)";

		// save changes and reload the entire project
		scribe.save_current_projects();
		scribe.save_settings();
		scribe.init();
	},
	import_project : function () {
		var tmp_p = a.get("import_export").value;
		tmp_p = JSON.parse(tmp_p);
		var no_match = 0;
		for (i = 0; i < scribe.data.length; i += 1) {
			if (scribe.data[i].p_title === tmp_p.p_title) {
				scribe.data[i] = tmp_p;
				scribe.save_current_projects();
				scribe.default.project = i;
				scribe.save_settings();
				scribe.init();
			} else {
				no_match += 1;
			}
			if (no_match > scribe.data.length-1) {
				scribe.default.project = scribe.data.length;
				scribe.data.push(tmp_p);
				scribe.save_current_projects();
				scribe.save_settings();
				scribe.init();
			}
		}
	},
	export_project : function () {
		a.get("import_export").value = JSON.stringify(scribe.data[scribe.default.project]);
	},
	export_text : function () {
		var tmp_text = "";
		for (i = 0; i < scribe.data[scribe.default.project].p_scenes.length; i += 1){
			tmp_text += scribe.data[scribe.default.project].p_scenes[i].s_text;
		}
		a.get("import_export").value = tmp_text;

	},
	export_summary : function () {
		var tmp_text = "";
		tmp_text += "Summary for " + scribe.data[scribe.default.project].p_title + "\r\n";
		tmp_text += scribe.get_date() + "\r\n \r\n";
		for (i = 0; i < scribe.data[scribe.default.project].p_scenes.length; i += 1){
			tmp_text += scribe.data[scribe.default.project].p_scenes[i].s_purpose;
		}
		a.get("import_export").value = tmp_text;
	},
	export_notes : function () {
		var tmp_text = "";
		tmp_text += "Notes for " + scribe.data[scribe.default.project].p_title + "\r\n";
		tmp_text += scribe.get_date() + "\r\n \r\n";
		for (i = 0; i < scribe.data[scribe.default.project].p_notes.length; i += 1){
			tmp_text += scribe.data[scribe.default.project].p_notes[i][0] + "\r\n";
			tmp_text += scribe.data[scribe.default.project].p_notes[i][1] + "\r\n";
			tmp_text += scribe.data[scribe.default.project].p_notes[i][2] + "\r\n \r\n";
		}
		a.get("import_export").value = tmp_text;

	},
	generate_chapters : function () {
		// get vars from form
		var tmp_goal = a.get("p_goal");
		var tmp_ch = a.get("p_ch_goal");
		var tmp_ch_goal = Math.ceil(tmp_goal/tmp_ch);

		// check any existing chapters and add additional chapters with chapter wordcount goal
	},

	// Scene Functions
	load_project_scenes : function () {
		// load into both setting menus
		var tmp_scenes = scribe.data[scribe.default.project].p_scenes
		var tmp_options = "";

		for (i = 0; i < tmp_scenes.length; i += 1) {
			if (i != scribe.default.scene) {
				tmp_options += "<option value=\"" + i + "\" >" + tmp_scenes[i].s_title + "</option>\r\n";
			} else {
				tmp_options += "<option value=\"" + i + "\" selected>" + tmp_scenes[i].s_title + "</option>\r\n";
			}
		}
		a.get("s_select").innerHTML = tmp_options;
	},
	load_scene : function (s_id) {
		// save project, change default scene, update ui
		
		scribe.default.scene = s_id;
		scribe.save_settings();

		var tmp_p = scribe.data[scribe.default.project];
		var tmp_s =	tmp_p.p_scenes[scribe.default.scene];

		a.get("s_title").value = tmp_s.s_title;
		a.get("s_purpose").value = tmp_s.s_purpose;
		a.get("s_characters").value = tmp_s.s_characters;
		a.get("s_lastdate").innerHTML = tmp_s.s_lastdate;
		a.get("s_text").value = tmp_s.s_text;
		a.get("s_word_count").innerHTML = scribe.word_count(tmp_s.s_text);
		scribe.load_project_scenes();
		scribe.default.nav = "scene";
		scribe.nav(scribe.default.nav);
	},
	delete_scene : function () {
		// splice 1 at s_id
		if (confirm("Delete scene?")) {
			scribe.data[scribe.default.project].p_scenes.splice(scribe.default.scene,1);
			scribe.save_current_projects();
			if (scribe.default.scene > scribe.data[scribe.default.project].p_scenes.length-1){
				scribe.default.scene = scribe.data[scribe.default.project].p_scenes.length-1;
				scribe.save_settings();
			}
			scribe.init();
		}
	},
	new_scene : function () {
		// generate new s_id and blank scene UI
		var tmp_title = prompt("What would you like to name your new scene?", "Scene " + scribe.data[scribe.default.project].p_scenes.length);
		if (tmp_title != null) {
			scribe.data[scribe.default.project].p_scenes.push({
				s_lastdate : scribe.get_date(),
				s_title : tmp_title,
				s_purpose : "",
				s_characters : "",
				s_text : ""
			});
			scribe.save_current_projects();
			scribe.default.scene = scribe.data[scribe.default.project].p_scenes.length-1;
			scribe.save_settings();
			scribe.init();
		}
	},
	scene_word_count : function () {
		a.get("s_text").onblur = function () {
			scribe.save_settings();
			scribe.save_project();
		}
		a.get("note_text").onblur = function () {
			scribe.save_settings();
			scribe.save_project();
		}
	},
	word_count : function (s_id) {
		// count number of words in a scene
		var tmp = s_id.split(" ");

		// Eliminate line endings to improve word count accuracy
		tmp = tmp.join("\r\n");
		tmp = tmp.split("\r\n");
		tmp = tmp.join("\r");
		tmp = tmp.split("\r");
		tmp = tmp.join("\n");
		tmp = tmp.split("\n");

		// Remove empty elements so word_count is more accurate

		for (i = 0; i < tmp.length; i += 1) {
			if (tmp[i] === "" || tmp[i] === " " || tmp[i] === "\r\n" || tmp[i] === "\r\n\r\n"){
				tmp.splice(i,1);
				i-= 1;
			}
		}

		return tmp.length;
	},

	// Note Functions
	load_project_notes : function () {
		var tmp_note = scribe.data[scribe.default.project].p_notes;
		var tmp_opt = {
			"Character" : "c_select",
			"Setting" : "set_select",
			"Item" : "i_select",
			"Note" : "n_select"
			};
		var Character_opt="<option value='0'>Select</option>",
		Setting_opt="<option value='0'>Select</option>",
		Item_opt="<option value='0'>Select</option>",
		Note_opt="<option value='0'>Select</option>";

		// allow blank lists
		if (tmp_note.length > 0){
			for (i in tmp_note) {
				var tmp_opt = "";
				
				tmp_opt = "<option value=\"" + i + "\" >" + tmp_note[i][0] + "</option>\r\n";
				
				// Put select options in the correct category
				if (tmp_note[i][1] === "Character") {
					Character_opt += tmp_opt;
				}
				if (tmp_note[i][1] === "Setting") {
					Setting_opt += tmp_opt;
				}
				if (tmp_note[i][1] === "Item") {
					Item_opt += tmp_opt;
				}
				if (tmp_note[i][1] === "Note") {
					Note_opt += tmp_opt;
				}
			}
		}

		// output finished select options
		a.get("c_select").innerHTML = Character_opt;
		a.get("set_select").innerHTML = Setting_opt;
		a.get("i_select").innerHTML = Item_opt;
		a.get("n_select").innerHTML = Note_opt;

	},
	load_note : function (n_id) {
		scribe.default.note = n_id;
		scribe.save_settings();
		var tmp_note = scribe.data[scribe.default.project].p_notes[scribe.default.note];
			a.get("note_name").value = tmp_note[0];
			a.get("note_cat").innerHTML = tmp_note[1];
			a.get("note_text").value = tmp_note[2];
	},
	delete_note : function () {
		if(confirm("Delete note?")){
			scribe.data[scribe.default.project].p_notes.splice(scribe.default.note,1);
			for (i in scribe.data[scribe.default.project].p_notes) {
				var tmp = 0;
				if (tmp === 0) {
					scribe.default.note = i;
				} 
			}
			scribe.save_current_projects();
			scribe.save_settings();
			scribe.init();
		}
	},
	new_note : function (category) {
		var tmp_notes = scribe.data[scribe.default.project].p_notes;
		var tmp_name = prompt("What would you like to name this note?","New " + category + " " +tmp_notes.length);
		if (tmp_name != null) {
			scribe.default.note = tmp_notes.length;
		tmp_notes.push([tmp_name,category,""]);
		scribe.save_current_projects();
		scribe.save_settings();
		scribe.init();
		}
	},

	// Print Function
	load_print_view : function () {
		var tmp_print = "";
		var tmp_project = scribe.data[scribe.default.project];

		tmp_print += tmp_project.p_title + "<br /><br />" + tmp_project.p_author + "<br />" + tmp_project.p_lastdate + "<br /><br /><p>";
		// loop through all the scenes and smash them together to display on the page.
		for (i = 0; i < tmp_project.p_scenes.length; i += 1){
			tmp_print += tmp_project.p_scenes[i].s_text + "\r\n";
		}
		// Double Spaces
		while (tmp_print.lastIndexOf("\r\n\r\n\r\n") !== -1){
			tmp_print = tmp_print.replace("\r\n\r\n\r\n","</p><p>&nbsp;</p><p>");
		}
		while (tmp_print.lastIndexOf("\r\r\r") !== -1){
			tmp_print = tmp_print.replace("\r\r\r","</p><p>&nbsp;</p><p>");
		}
		while (tmp_print.lastIndexOf("\n\n\n") !== -1){
			tmp_print = tmp_print.replace("\n\n\n","</p><p>&nbsp;</p><p>");
		}
		// Add paragraphs
		while (tmp_print.lastIndexOf("\r\n") !== -1){
			tmp_print = tmp_print.replace("\r\n","</p><p>");
		}
		while (tmp_print.lastIndexOf("\r") !== -1){
			tmp_print = tmp_print.replace("\r","</p><p>");
		}
		while (tmp_print.lastIndexOf("\n") !== -1){
			tmp_print = tmp_print.replace("\n","</p><p>");
		}
		tmp_print += "</p>";
		a.get("print_text").innerHTML = tmp_print;
	},
	
	data : [{
		p_title : "The Default Project",
		p_author : "Kendall Purser",
		p_createdate : "2016-07-13",
		p_lastdate : "2016-07-14",
		p_wordcount : 0,
		sprint_wordcount : 0,
		p_scenes : [{
			s_lastdate : "2016-07-14",
			s_title : "Scene 0- Once upon a time",
			s_purpose : "To begin the story and introduce the characters.",
			s_characters : "John and Mary",
			s_text : "CHAPTER 1 \r\n\r\n Once upon a time John and Mary sat on a bench in the park. It was a lovely spring day and the bees were buzzing around the tulips and crocuses."
		},{
			s_lastdate : "2016-07-18",
			s_title : "Scene 1- The plot thickens",
			s_purpose : "To develop the characters more.",
			s_characters : "John and Mary",
			s_text : "John said, \"Why don\'t we go and get a lemonade?\" \r\n Mary said, \"I\'d rather have a sandwich.\""
		}],
		p_notes : [ // [name,category,text] 
			["John","Character","Tall, dark, handsome!"],
			["Mary","Character", "The woman of John's dreams"],
			["Park","Setting", "A beautiful park in the residential part of town. There is a ball diamond on one end and a walking path around the outside dotted with park benches."],
			["Rose","Item","A beautiful pink thornless rose."],
			["Things to think about","Note","Scene 1: Should I make it rain on them while they are in the park?"]
		]
	}]
};

window.onbeforeunload = (function(){
	scribe.save_project();
})

// andi 0.2 - mobile dev toolkit
// Written by Kendall Purser
// 2016.07.18

	// ***catch browser errors and log them
	window.onerror = function (msg, url, num, col, obj) {
		a.log("ERR(" + num + ", " + col + ") " + msg + "<br />" + url + " " + obj);
	};
	
	// ***JavaScript API***
	var a = {
		get : function (id) {
			var temp_id = document.getElementById(id);
			return temp_id;
		},
		apnd : function (id, x) {
			a.get(id).innerHTML = get(id).innerHTML + x;
		},
		ppnd : function (id, x) {
			a.get(id).innerHTML = x + get(id).innerHTML;
		},
		log : function (msg) {
			a.show("log");
			var temp = get("log").innerHTML;
			a.get("log").innerHTML = temp + "<br /> " + msg;
		},
		css : function (id,key_val) {
			for (i in key_val) {
				a.get(id).style[i] = key_val[i];
			}
		},
		show : function (id) {
			a.css(id, {"display":"block"});
		},
		hide : function (id) {
			a.css(id, {"display":"none"});
		},

		// localStorage functions
		save : function (key, value) {
			localStorage.setItem(key, JSON.stringify(value));
		},
		read : function (key) {
			return JSON.parse(localStorage.getItem(key));
		},
		clear : function (key) {
			localStorage.removeItem(key);
		},

		// responsive navigation
		nav_state : 0,
		menu_toggle : function () {
				if (a.nav_state === 0) {
					a.show("links");
					a.nav_state = 1;
				} else {
					a.hide("links");
					a.nav_state = 0;
				}
		}
	};

scribe.init();
