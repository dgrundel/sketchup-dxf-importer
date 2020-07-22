# frozen_string_literal: true
require 'sketchup.rb'
require 'json'

module Grundel
  module DxfImport

    DIALOG_HTML_PATH = File.expand_path('index.html', File.dirname(__FILE__))
    DIALOG_OPTIONS = {
      dialog_title: 'Import',
      preferences_key: 'com.grundel.dxfImport',
      scrollable: false,
      resizable: true,
      width: 1100,
      height: 800,
      # left: 100,
      # top: 100,
      min_width: 1000,
      min_height: 500,
      # max_width: 1000,
      # max_height: 1000,
      style: UI::HtmlDialog::STYLE_DIALOG
    }.freeze
    FILE_TYPE_STR = "DXF|*.dxf";

    def self.show_import_dialog
      dialog = UI::HtmlDialog.new(DIALOG_OPTIONS)

      dialog.add_action_callback('getFile') do |_action_context, prev_path, prev_name|
        file_path = UI.openpanel("Select File", Dir.home, FILE_TYPE_STR)
        
        unless file_path.nil? || file_path.empty? then
          data = {
            modelUnits: Sketchup.active_model.options['UnitsOptions']['LengthUnit'],
            fileContents: File.read(file_path)
          }
  
          dialog.execute_script("sketchupConnector.receiveFileContents(#{data.to_json})")
        else
          # close the dialog if the open dialog was cancelled
          dialog.close();
        end
      end

      dialog.set_file(DIALOG_HTML_PATH)
      dialog.show
    end

    unless file_loaded?(__FILE__)
      tool_menu = UI.menu('Tools')
      tool_menu.add_item('Import DXF...') {
        show_import_dialog()
      }

      file_loaded(__FILE__)
    end

  end # module DxfImport
end # module Grundel
