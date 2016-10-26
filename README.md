# Scribe

In browser writing and organizational tool for authors, includes import, export, and print options.

# Introduction

In recent years authors have begun abandoning Microsoft Word and other traditional word processors for new software designed to help them organize their notes within their text editor. The most notable of these programs is Scrivener, which comes with a fairly modest price tag of $40-45. However this only runs on Windows and Mac.

Scribe is free. It works on all operating systems running a modern browser. (It was written on Linux Mint with the Google Chrome browser.) You can export your data files for back up, or your finished text. It also offeres most of the basic organizaitonal functionality of Scrivener. 

# Features

In this section you will learn how to use each tab within Scribe. The tabs on the left are for managing and writing the project. The tabs on the right are for notes and reference material.

***Project-*** On this tab you can create, import, export, duplicate, and delete projects. You can also purge your data from the browser's memory. This will wipe out all projects, so be careful! It is better to delete one project than to lose them all! You can also purge Scribe's settings if it is not behaving correctly after an update. In the Import/Export section you can also export notes, and a summary which combines all the "Purpose" fields in the project. 

***Outline-*** On this tab you can move scenes around within your project to see where they fit best. If you click on the scene title it will open in the Scene tab.

***Scene-*** This tab is where you will do all of your writing. The title of your scene will appear in the Outline tab. Every scene should have a purpose, so type your purpose before you start the scene, this field can be used to export a summary of your project on the Project tab. Knowing what characters you plan to have in the scene can be helpful when you come back to type a scene after you have outlined your story. Scribe saves as you type, to show this the date and word count update automatically.

***Preview-*** The purpose of the preview tab is to help you edit for continuity. If someone has brown eyes in Chapter 1 they better have brown eyes in Chapter 27. Scroll to the part of the story you need to reference while keeping your place in the current scene in the left tab. You can also view changes you make to your scene order in the Outline tab. Currently you can only print the entire project.

***Notes-*** Type up notes about your characters, settings, items, and any other odd notes in the Notes tab. This way all your notes are in the same place and you can view them on the same screen where you are typing. Have a reference image from the web? Paste the link in your notes so you can refer back to it when you start writing. If you are having trouble comming up with unique names, there is a link in the Tools section for a Random Name Generator.

# Limitations

Scribe is designed for 1000 pixel wide screens, so it may not work on your phone.

Scribe runs in your browser, so your data is stored in the browser you visit the page with. You must use the same browser on the same computer in order to access your data. You can export your project file and transfer it via Dropbox or thumbdrive to another computer if you would like to take your work with you, this is also not a bad idea for backing up your data should your browser cache get wiped.

If you encounter errors after an update click "Purge Settings" then refresh the page and the errors should clear. This may need to be done multiple times. If this doesn't work, export your project files and "Purge Memory" followed by "Purge Settings", then refresh the page and import your project files again. (I know this is painful, but at the moment it is the only way to reset everything after an update.)

If the Project tab isn't visible for some reason, the following commands can be typed into the console for the same effect: 

a.clear("scribe_settings");

a.clear("scribe_data");


# Changelog

0.5
---

Distraction Free Mode on the Scene tab

Duplicate Project (so you can create a "snapshot")

Save on Exit

Export Notes

Export Summary (Uses the "Purpose" field on the Scene tab)

Default notes for new projects only includes "Brainstorm"

A link to a Random Name Generator on the Notes tab 
