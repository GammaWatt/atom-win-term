'use babel';

import AtomWinTermView from './atom-win-term-view';
import { CompositeDisposable } from 'atom';


import {BufferedProcess} from 'atom';
import 'atom';


//import {spawn} from 'child_process';
import {exec} from 'child_process';



export default {

  atomWinTermView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomWinTermView = new AtomWinTermView(state.atomWinTermViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomWinTermView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-win-term:toggle': () => this.openWinCmd(),
      'atom-start-me-venv:doit': () => this.openWinCmdAndActivate()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomWinTermView.destroy();
  },

  serialize() {
    return {
      atomWinTermViewState: this.atomWinTermView.serialize()
    };
  },

  openWinCmdAndActivate() {

    function loopyloop(string) {
      p = string
      for(var j = 0; j < p.length; j ++) {
        if(p[j] == "\\") {
          p = p.slice(0, j) + "" + p.slice(j+1, p.length);
        }
      }
      return p
    }

    function dirFunc () {
      return 'start "" cmd /K ' + (function dibs () {
        var o = atom.workspace.getActiveTextEditor();
        var dirs = atom.project.rootDirectories;
        var oExp;
        var result = false;
        for (var i = 0; i < dirs.length; i++) {
          oExp = dirs[i].realPath;
          oExp = loopyloop(oExp);
          console.log("testing: ");
          console.log(dirs[i].realPath);
          console.log(oExp);
          oExp = new RegExp(oExp);
          var p = o.getPath();
          p = loopyloop(p);
          console.log(p);
          console.log(oExp);
          if (oExp.test(p)) {
            result = dirs[i].realPath;
          }
        }
        console.log("result is:");
        console.log(result);
        console.log("----------");
        if (result) {
          result = '"cd /d ' + result;
        } else {
          result = 'echo borked. couldn\'t find the project this file\'s for';
        }
        return result + ' & activate venv"';
      })();
    }
    console.log(atom.workspace);

    /*
    console.log(o);
    console.log(o.getPath());
    console.log(o.getFileName());
    console.log(o.getDirectoryPath());
    console.log(o);*/
    console.log("trying to activate...")
    console.log(dirFunc());
    console.log("executing");
    exec(dirFunc());
  },

  openWinCmd() {

    function loopyloop(string) {
      p = string
      for(var j = 0; j < p.length; j ++) {
        if(p[j] == "\\") {
          p = p.slice(0, j) + "" + p.slice(j+1, p.length);
        }
      }
      return p
    }

    function dirFunc () {
      return 'start "" cmd /K ' + (function dibs () {
        var o = atom.workspace.getActiveTextEditor();
        var dirs = atom.project.rootDirectories;
        var oExp;
        var result = false;
        for (var i = 0; i < dirs.length; i++) {
          oExp = dirs[i].realPath;
          oExp = loopyloop(oExp);
          console.log("testing: ");
          console.log(dirs[i].realPath);
          console.log(oExp);
          oExp = new RegExp(oExp);
          var p = o.getPath();
          p = loopyloop(p);
          console.log(p);
          console.log(oExp);
          if (oExp.test(p)) {
            result = dirs[i].realPath;
          }
        }
        console.log("result is:");
        console.log(result);
        console.log("----------");
        if (result) {
          result = '"cd /d ' + result;
        } else {
          result = 'echo borked. couldn\'t find the project this file\'s for';
        }
        return result + '"';
      })();
    }
    console.log('AtomWinTerm was toggled!');
    console.log(atom.project);
    console.log(atom.project.rootDirectories);
    console.log(atom.project.rootDirectories[0].realPath);
    console.log("FUNKY");
    console.log(dirFunc());
    exec(dirFunc());

    //console.log(atom.project.getPaths());
    /*var workspace = atom.workspace.open();
    console.log(workspace);

    workspace.then( (textEditor) => {
      console.log(textEditor);
      // textEditor.insertText("hooped");

      var textBuffer = textEditor.buffer;

      var cmd = new BufferedProcess({
        command: 'cmd',

        stdout: (output) => textEditor.insertText(output),
        exit: (code) => console.log("exited: ", code)
      });*/

      //console.log(cmd);
      // textBuffer

    //});
    //["[[PromiseValue]]"]

      // offers the view (THE HTML PRESENTATION OF THE THING, NOT FUNCTIONALITY)
      // var textEditor = atom.views.getView(event.item);

/*
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
    */
  }

};
