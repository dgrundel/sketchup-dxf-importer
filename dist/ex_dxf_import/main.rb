# frozen_string_literal: true
require 'sketchup.rb'
require 'json'

module Grundel
  module DxfImport

    DIALOG_HTML_PATH = File.expand_path('index.html', File.dirname(__FILE__))
    DIALOG_OPTIONS = {
      dialog_title: 'Import',
      preferences_key: 'com.grundel.dxfImport',
      scrollable: true,
      resizable: true,
      width: 800,
      height: 600,
      min_width: 800,
      min_height: 600,
      style: UI::HtmlDialog::STYLE_DIALOG
    }.freeze
    FILE_TYPE_STR = "DXF|*.dxf";

    def self.show_import_dialog
      dialog = UI::HtmlDialog.new(DIALOG_OPTIONS)

      dialog.add_action_callback('getImportInput') do |_action_context, prev_path, prev_name|
        file_path = UI.openpanel("Select File", Dir.home, FILE_TYPE_STR)
        
        unless file_path.nil? || file_path.empty? then
          data = {
            modelUnits: Sketchup.active_model.options['UnitsOptions']['LengthUnit'],
            fileContents: File.read(file_path)
          }
  
          dialog.execute_script("sketchUpReceiver.receiveImportInput(#{data.to_json})")
        else
          # close the dialog if the open dialog was cancelled
          dialog.close();
        end
      end

      dialog.add_action_callback('insertGeometry') do |_action_context, json|
        data = JSON.parse(json)

        model = Sketchup.active_model
        model.start_operation(data['opName'], true)

        group = model.active_entities.add_group()
        entities = group.entities()

        data['lines'].each do |line|
          entities.add_line(line['start'], line['end'])
        end
        
        model.commit_operation()
        dialog.close()
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
