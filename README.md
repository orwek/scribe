# Scribe

Scribe is an in browser writing and organizational tool for authors. It includes import, export, and print functions. As well as organizational tools like Notes, Outline View, and a Summary Generator.

# Introduction

In recent years authors have begun abandoning Microsoft Word and other traditional word processors for new software designed to help them organize their notes within their text editor. The most notable of these programs is Scrivener, which comes with a fairly modest price tag of $40-45. However this program only runs on Windows and Mac.

Scribe is free. It works on all operating systems running a modern browser. (It was written on Linux Mint with the Google Chrome browser.) You can export your data file for back up, or your finished text when you are ready to format for publication. It also offeres most of the basic organizaitonal functionality of Scrivener. 

# Features

In this section you will learn how to use each tab within Scribe. The tabs on the left are for managing and writing the project. The tabs on the right are for notes and reference material.

***Project-*** On this tab you can create, import, export, duplicate, and delete projects. You can also purge Scribe's settings if it is not behaving correctly after an update. You can also purge your data from the browser's memory. This will wipe out all projects, so be careful! It is better to delete one project than to lose them all!  In the Import/Export section you can also export notes, and a summary which combines all the "Purpose" fields from the scenes in the project. 

***Outline-*** On this tab you can move scenes around within your project to see where they fit best. Each scene shows the title and word count for that scene, when the wordcount is at 0 it is also highlighted in red to help you see what still needs worked on. Used in conjunction with the Preview tab this can be a very powerful organizational tool. If you click on the scene title in the Outline, it will open in the Scene tab. 

***Scene-*** This is the tab where you will do all of your writing. The title of your scene will appear in the Outline tab, and the Purpose field will be used to generate your summary in the Project tab. Every scene should have a purpose in your story, so add it before you start writing the scene. Knowing what characters you plan to have in the scene can be helpful when you come back to type a scene after you have outlined your story. Scribe saves as you type in the text field, to show this the date and word count update automatically. To save the other fields, use the "Save" button. The Focus button makes the Scene tab go full screen, so you can focus on that scene without other distractions.

***Preview-*** The purpose of the preview tab is to help you edit for continuity. If someone has brown eyes in Chapter 1 they better have brown eyes in Chapter 27. Scroll to the part of the story you need to reference while keeping your place in the current scene in the left tab. You can also view changes you make to your scene order in the Outline tab. If you would like to print your project, click the "Print" button.

***Notes-*** Type up descriptions of your characters, settings, items, and any other notes in the Notes tab. This way all your notes are in the same place and you can view them on the same screen where you are typing. Have a reference image from the web? Paste the link in your notes so you can refer back to it when you start writing. If you are having trouble comming up with unique names, there is a link in the Tools section for a Random Name Generator.

# Limitations

Scribe is designed for 1000 pixel wide screens, so it may not work on your phone.

Scribe was designed for use on Google Chrome. Other browsers may render the screen differently so it appears less polished.

Scribe runs in your browser, so your data is stored in the browser you visit the page with. You must use the same browser on the same computer in order to access your data. If you would like to work on a different computer or browser, you can export your project file and transfer it via Dropbox or thumbdrive to another computer. This is also not a bad idea for backing up your data should your browser cache get wiped.

If you encounter errors after an update click "Purge Settings" then refresh the page and the errors should clear. This may need to be done multiple times. If this doesn't work, export your project files and "Purge Memory" followed by "Purge Settings", then refresh the page and import your project files again. (I know this is painful, but at the moment it is the only way to reset everything after an update.)

If the Project tab isn't visible for some reason, the following commands can be typed into the console for the same effect: 

a.clear("scribe_settings"); // Clear settings, this doesn't affect project save files.

a.clear("scribe_data"); // This will delete all projects, so be careful!


# Changelog

0.6
---

New UI- All tabs, only split on Scene/Chapter tab

Set Project Word Count Goal

Automatic Chapter Generation

Outline tab shows average words per Scene/Chapter to reach goal

Outline tab shows gradient of completion per Scene/Chapter to reach goal

Scene/Chapter tab shows word count for Scene, Total, and Sprint

Scene/Chapter defaults to focus mode, and has "Toggle Notes" button to split screen

Notes tab has new UI

Notes tab allows you to create your own categories

Notes dropdown is organized alphabetically by category then note name.

Tools tab includes several in browser tools to help authors with the writing process. Including several public domain image libraries.

Preview tab uses monospace font, and double line spacing to bring it closer to Standard Manuscript Format. 

Print width was fixed.

Settings tab allows the user to set a custom background image or color.

Settings tab has font size and type options.

Settings tab has Night Mode Toggle.

Settings tab allows the user to set the default writing unit to Chapter, Scene, or Story.

Settings tab has clear descriptions to help users decide when they need to purge settings or memory.


0.5
---

Distraction Free Mode on the Scene tab

Duplicate Project (so you can create a "snapshot")

Save on Exit

Export Notes

Export Summary (Uses the "Purpose" field on the Scene tab)

Default notes for new projects only includes "Brainstorm"

A link to a Random Name Generator on the Notes tab 

Added the Donate Button

Outline now shows word count for that scene and turns red when the wordcount is 0

0.4
---

Bug Fixes

Notes save as you type

If you cancel a new note or project it no longer creates a "null" object

When you create a new project it loads all tabs with the new project properly

Fixed the Import/Export feature

Allowed blank lines if you triple space

Fixed several bugs that caused the program to crash when you refreshed the page

0.3
---

New data structure for notes

Notes now open from a dropdown menu, rather than separate tabs

Create new projects

Purge Settings button

0.2
---

New UI with 2 sets of tabs

More friendly use of space for different sizes of monitors

Save settings

Help button to access this documentation

Outline tab reworked

0.1
---

Full Screen UI (Widescreen only)

Save to browser memroy

Data structure

Import/Export functionality

Outline view

Character and Setting sections

Project and Scene sections

