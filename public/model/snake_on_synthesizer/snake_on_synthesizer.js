"use strict"

// register the application module
b4w.register("snake_on_synthesizer_main", function(exports, require) {

// import modules used by the app
var m_app       = require("app");
var m_cfg       = require("config");
var m_data      = require("data");
var m_preloader = require("preloader");
var m_ver       = require("version");
var m_scene = require("scenes");
var m_material = require("material");
var m_anim = require("animation");
var m_anchor = require("anchors");

// detect application mode
var DEBUG = (m_ver.type() == "DEBUG");

// automatically detect assets path
var APP_ASSETS_PATH = m_cfg.get_assets_path("snake_on_synthesizer");

/**
 * export the method to initialize the app (called at the bottom of this file)
 */
exports.init = function() {
    m_app.init({
        canvas_container_id: "main_canvas_container",
        callback: init_cb,
        show_fps: DEBUG,
        console_verbose: DEBUG,
        autoresize: true,
        force_container_ratio: 1
    });
}

/**
 * callback executed when the app is initialized 
 */
function init_cb(canvas_elem, success) {

    if (!success) {
        console.log("b4w init failure");
        return;
    }

    m_preloader.create_preloader();

    // ignore right-click on the canvas element
    canvas_elem.oncontextmenu = function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };

    load();
}

/**
 * load the scene data
 */
function load() {
    m_data.load("snake_on_synthesizer/assets/snake_on_synthesizer.json", load_cb, preloader_cb);
}

/**
 * update the app's preloader
 */
function preloader_cb(percentage) {
    m_preloader.update_preloader(percentage);
}

/**
 * callback executed when the scene data is loaded
 */
function load_cb(data_id, success) {

    if (!success) {
        console.log("b4w load failure");
        return;
    }

    m_app.enable_camera_controls();
    var snake_rig = m_scene.get_object_by_name("snake_armature");
    m_anim.apply(snake_rig, "snake_armatureAction_B4W_BAKED", m_anim.SLOT_1);
    var annotations = [];
    annotations.push(m_scene.get_object_by_name("usb_port_anchor"));
    annotations.push(m_scene.get_object_by_name("nostrils_anchor"));
    annotations.push(m_scene.get_object_by_name("light_anchor"));
    annotations.push(m_scene.get_object_by_name("flexible_neck_anchor"));
    annotations.push(m_scene.get_object_by_name("belly_anchor"));
    annotations.push(m_scene.get_object_by_name("snake_pad_anchor"));
    annotations.push(m_scene.get_object_by_name("arrow_1"));
    annotations.push(m_scene.get_object_by_name("arrow_2"));
    annotations.push(m_scene.get_object_by_name("arrow_3"));
    annotations.push(m_scene.get_object_by_name("arrow_4"));
    annotations.push(m_scene.get_object_by_name("arrow_5"));
    annotations.push(m_scene.get_object_by_name("arrow_6"));
    m_anim.apply(annotations[0], "usb_port_anchorAction", m_anim.SLOT_1);
    m_anim.apply(annotations[1], "nostrils_anchorAction", m_anim.SLOT_1);
    m_anim.apply(annotations[2], "light_anchorAction", m_anim.SLOT_1);
    m_anim.apply(annotations[3], "flexible_neck_anchorAction", m_anim.SLOT_1);
    m_anim.apply(annotations[4], "belly_anchorAction", m_anim.SLOT_1);
    m_anim.apply(annotations[5], "snake_pad_anchorAction", m_anim.SLOT_1);
    var snake_opaque_parts = [];
    snake_opaque_parts.push(m_scene.get_object_by_name("snake_back"));
    snake_opaque_parts.push(m_scene.get_object_by_name("snake_neck"));
    snake_opaque_parts.push(m_scene.get_object_by_name("snake_head"));
    var cables = [];
    cables.push(m_scene.get_object_by_name("cable_1"));
    cables.push(m_scene.get_object_by_name("cable_2"));
    var anchor_buttons = document.querySelectorAll(".anchor-btn");
    var transparent_carrier = m_scene.get_object_by_name("transparent_mat");
    var body_back_sample = m_scene.get_object_by_name("body_back_sample");
    var snake_fallback_mat = m_scene.get_object_by_name("snake_tail");
    var coiledSnake = m_scene.get_object_by_name("coiled_snake");
    var synthesizer = m_scene.get_object_by_name("synthesizer");
    var coiledSnakeAnchor = m_scene.get_object_by_name("coiled_snake_anchor");
    var nostrilLights = m_scene.get_object_by_name("snake_nostril_lights");
    var partsForHiding = [];
    partsForHiding.push(m_scene.get_object_by_name("head_downside"));
    partsForHiding.push(m_scene.get_object_by_name("long_neck"));
    partsForHiding.push(m_scene.get_object_by_name("pcb"));
    partsForHiding.push(m_scene.get_object_by_name("pcb_lights"));
    partsForHiding.push(m_scene.get_object_by_name("robber_neck"));
    partsForHiding.push(m_scene.get_object_by_name("snake_belly"));
    partsForHiding.push(m_scene.get_object_by_name("usb_tongue"));
    partsForHiding.push(snake_fallback_mat);
    partsForHiding.push(transparent_carrier);
    partsForHiding.push(snake_opaque_parts[0]);
    partsForHiding.push(snake_opaque_parts[1]);
    partsForHiding.push(snake_opaque_parts[2]);
    partsForHiding.push(synthesizer);
    partsForHiding.push(nostrilLights);
    partsForHiding.push(m_scene.get_object_by_name("snake_prop"));
    var states = {
        isAnnotationsOpen: true,
        isSnakeOpaque: true,
        isCablesVisisble: true,
        isAllVisible: true,
        isCoiled: false,
        isLightsOn: true,
        isSnakeInDefaultPosition: true,
        isSynthesizerVisisble: true
    };
    var hideOrShow = function(target, condition){
        if(states[condition])
        {
            target.forEach(function(element){
                m_scene.hide_object(element);
            });
            states[condition] = false;
        }
        else
        {
            target.forEach(function(element){
                m_scene.show_object(element);
            });
            states[condition] = true;
        }
    };
    var turnLightsOn = function(turnOrWhat)
    {
        if(turnOrWhat)
        {
            m_material.set_nodemat_rgb(nostrilLights, ["glowing_light_source", "RGB"], 0.275, 0.745, 0.287);
            m_material.set_nodemat_value(nostrilLights, ["glowing_light_source", "Value"], 7);
            m_material.set_nodemat_rgb(partsForHiding[3], ["glowing_light_source", "RGB"], 0.275, 0.745, 0.287);
            m_material.set_nodemat_value(partsForHiding[3], ["glowing_light_source", "Value"], 7);
            states['isLightsOn'] = true;
        }
        else
        {
            m_material.set_nodemat_rgb(nostrilLights, ["glowing_light_source", "RGB"], 0.028, 0.296, 0.020);
            m_material.set_nodemat_value(nostrilLights, ["glowing_light_source", "Value"], 0);
            m_material.set_nodemat_rgb(partsForHiding[3], ["glowing_light_source", "RGB"], 0.028, 0.296, 0.020);
            m_material.set_nodemat_value(partsForHiding[3], ["glowing_light_source", "Value"], 0);
            states['isLightsOn'] = false;
        }
    };
    var seeInside = function(){
        if(states["isSnakeOpaque"])
        {
            if(states["isLightsOn"])
                turnLightsOn(false);
            snake_opaque_parts.forEach(function(element, index){
                if(index === 1)
                {
                    m_material.inherit_material(transparent_carrier, "transparent_mat", element, "plastic_body_mat");
                    
                }
                else
                {
                    m_material.inherit_material(transparent_carrier, "transparent_mat", element, "plastic_body_back");
                    m_material.inherit_material(transparent_carrier, "transparent_mat", element, "plastic_body_back");
                }
            });
            states["isSnakeOpaque"] = false;
        }
        else
        {
            snake_opaque_parts.forEach(function(element, index){
                if(index === 1)
                {
                    m_material.inherit_material(snake_fallback_mat, "plastic_body_mat", element, "plastic_body_mat");
                }
                else
                {
                    m_material.inherit_material(body_back_sample, "plastic_body_back", element, "plastic_body_back");
                    m_material.inherit_material(body_back_sample, "plastic_body_back", element, "plastic_body_back");
                }
            });
            if(states['isSnakeInDefaultPosition'])
            {
                turnLightsOn(true);
            }
            states["isSnakeOpaque"] = true;
        }
    };
    var animateToFrame = function(frameNumber)
    {
        m_anim.set_frame(snake_rig, frameNumber, m_anim.SLOT_1);
        m_anim.set_frame(annotations[0], frameNumber, m_anim.SLOT_1);
        m_anim.set_frame(annotations[1], frameNumber, m_anim.SLOT_1);
        m_anim.set_frame(annotations[2], frameNumber, m_anim.SLOT_1);
        m_anim.set_frame(annotations[3], frameNumber, m_anim.SLOT_1);
        m_anim.set_frame(annotations[4], frameNumber, m_anim.SLOT_1);
        m_anim.set_frame(annotations[5], frameNumber, m_anim.SLOT_1);
        m_anim.set_frame(annotations[6], frameNumber, m_anim.SLOT_1);           
    }
    for(var btn of anchor_buttons)
    {
        if(btn.id === "anchor_1_btn")
        {
            btn.addEventListener("click", function(){
                if(states["isAllVisible"])
                {
                    hideOrShow(partsForHiding, "isAllVisible");
                    if(states["isAnnotationsOpen"])
                    {
                        hideOrShow(annotations, "isAnnotationsOpen");
                    }
                    if(states["isCablesVisisble"])
                    {
                        hideOrShow(cables, "isCablesVisisble");
                    }
                    if(!states["isCoiled"])
                    {
                        hideOrShow([coiledSnake, coiledSnakeAnchor], "isCoiled");
                    }
                }
                else
                {
                    hideOrShow(partsForHiding, "isAllVisible");
                    if(!states["isCablesVisisble"] && states['isSnakeInDefaultPosition'])
                    {
                        hideOrShow(cables, "isCablesVisisble");
                    }
                    if(states["isCoiled"])
                    {
                        hideOrShow([coiledSnake, coiledSnakeAnchor], "isCoiled");
                    }
                }
            });
        }
        else if(btn.id === "anchor_2_btn")
        {
            btn.addEventListener("click", function(){
                if(!states['isCoiled'])
                {
                    hideOrShow(annotations, "isAnnotationsOpen");
                }
            });
        }
        else if(btn.id === "anchor_3_btn")
        {
            if(!states['isCoiled'])
            {
                btn.addEventListener("click", seeInside);
            }
        }    
        else if(btn.id === "anchor_4_btn")
        {
            btn.addEventListener("click", function(){
                if(!states['isCoiled'])
                {
                    if(states["isSnakeInDefaultPosition"] && states['isSynthesizerVisisble'])
                    {
                        hideOrShow(cables, "isCablesVisisble");
                    }
                    if(states["isSnakeOpaque"])
                    {
                        (states["isCablesVisisble"] && states["isSnakeInDefaultPosition"] && states['isSynthesizerVisisble'])?turnLightsOn(true):turnLightsOn(false);
                    }
                }
            });
        } 
        else if(btn.id === "anchor_5_btn")
        {
            btn.addEventListener("click", function(){
                    if(!states['isCoiled'])
                    {
                        if(states['isSynthesizerVisisble'] && states['isSnakeInDefaultPosition'] && states["isCablesVisisble"])
                        {
                            hideOrShow(cables, "isCablesVisisble");
                            states['isLightsOn']?turnLightsOn(false):turnLightsOn(true);
                        }
                        else if(!states['isSynthesizerVisisble'] && states['isSnakeInDefaultPosition'] && !states['isCablesVisisble'] && states['isSnakeOpaque'])
                        {
                            hideOrShow(cables, "isCablesVisisble");
                            turnLightsOn(true);
                        }
                        hideOrShow([synthesizer], "isSynthesizerVisisble");
                    }
            });
        }   
        else if(btn.id === "anchor_6_btn")
        {
            btn.addEventListener("click", function(){
                    if(!states['isCoiled'])
                    {
                        var currentFrame = m_anim.get_frame(snake_rig, m_anim.SLOT_1);
                        if(currentFrame === 1 || currentFrame === 2)
                        {
                            animateToFrame(3);
                            states["isSnakeInDefaultPosition"] = false;
                            if(states['isCablesVisisble'])
                            {
                                hideOrShow(cables, "isCablesVisisble");
                            }
                            turnLightsOn(false);
                        }
                        else if(currentFrame === 3 || currentFrame === 4)
                        {
                            animateToFrame(1);
                            states["isSnakeInDefaultPosition"] = true;
                            if(!states["isCablesVisisble"] && states['isSynthesizerVisisble'])
                            {
                                hideOrShow(cables, "isCablesVisisble");
                                turnLightsOn(true);
                            }
                        }
                    }
            });
        }   
        else if(btn.id === "anchor_7_btn")
        {
            btn.addEventListener("click", function(){
                if(!states['isCoiled'])
                {
                    var currentFrame = m_anim.get_frame(snake_rig, m_anim.SLOT_1);
                    if(currentFrame === 1)
                    {
                        animateToFrame(2);
                        states["isSnakeInDefaultPosition"] = false;
                        if(states["isCablesVisisble"])
                        {
                            hideOrShow(cables, "isCablesVisisble");
                        }
                        turnLightsOn(false);
                    }
                    else if(currentFrame === 2)
                    {
                        animateToFrame(1);
                        states["isSnakeInDefaultPosition"] = true;
                        if(!states["isCablesVisisble"] && states['isSynthesizerVisisble'])
                        {
                            hideOrShow(cables, "isCablesVisisble");
                            turnLightsOn(true);
                        }
                    }
                    else if(currentFrame === 3)
                    {
                        animateToFrame(4);
                        states["isSnakeInDefaultPosition"] = false;
                        if(states["isCablesVisisble"])
                        {
                            hideOrShow(cables, "isCablesVisisble");
                        }
                    }
                    else if(currentFrame === 4)
                    {
                        animateToFrame(3);
                        states["isSnakeInDefaultPosition"] = false;
                        if(states["isCablesVisisble"])
                        {
                            hideOrShow(cables, "isCablesVisisble");
                        }
                    }
                }
            });
        }   
    }

    // place your code here

}


});

// import the app module and start the app by calling the init method
b4w.require("snake_on_synthesizer_main").init();
