// js/content-aliases.js — QatarSpec Pro
// نُقل من inline script في index.html لإزالة unsafe-inline من CSP
// Content Aliases v1.0 — Maps short/variant names → canonical QS_CONTENT keys
// Pro verification: /api/verify-pro (server-side only)

window._CONTENT_ALIASES = {
  'road':'roads',
  'utility':'utilities',
  'geo':'geotech',
  'struct':'structural',
  'itp_roads':'road_itps',
  'itp_concrete':'itp_concrete',
  'itp_rebar':'rebar_itp',
  'itp_piling':'itp_piles',
  'itp_geotech':'itp_geotech',
  'itp_water':'itp_water_supply',
  'itp_sewer':'itp_sewer',
  'itp_storm':'itp_storm',
  'asphalt_spec':'ms_asphalt',
  'concrete_spec':'ms_concrete',
  'utilities_spec':'ms_utilities',
  'rebar_full_spec':'rebar_full',
  'concrete_full_spec':'concrete_full',
  'foundation_spec':'foundations_full',
  'piles_spec':'piles_full',
  'shoring_spec':'shoring_itp',
  'sabkha_spec':'sabkha_classification',
  'hot_weather':'hot_weather_detailed',
  'marker_colors':'marker_tape_colors',
  'road_design':'road_design_criteria',
  'road_layers':'road_layers_calc',
  'rebar_calc':'rebar_cover_calc',
  'soil_calc':'soil_grading_calc',
  'materials_calc':'materials_calculator_buildings',
  'pipe_calc':'pipe_sizing_calc',
  'esal_calc':'esal_calculator_full'
};
