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

    def self.show_import_dialog
      dialog = UI::HtmlDialog.new(DIALOG_OPTIONS)
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
