# Copyright 2020 Daniel Grundel
# Licensed under the MIT license

require 'sketchup.rb'
require 'extensions.rb'

module Grundel
  module DxfImport

    unless file_loaded?(__FILE__)
      ex = SketchupExtension.new('DxfImport', 'ex_dxf_import/main')
      ex.description = 'A simple DXF importer for Sketchup'
      ex.version     = '1.0.0'
      ex.creator     = 'Daniel Grundel'
      Sketchup.register_extension(ex, true)
      file_loaded(__FILE__)
    end

  end # module DxfImport
end # module Grundel
