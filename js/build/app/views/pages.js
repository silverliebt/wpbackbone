// Filename: views / pages
define(function (require) {

    var $ = require("jquery"),
        global = require("global"),
        _ = require("underscore"),
        Backbone = require("backbone"),
        plugins = require("plugins"),
        PagesModel = require('models/pages');


    // PagesView - a collectionView for pages
    var PagesView = Backbone.View.extend({

        model: new PagesModel(),

        initialize: function () {

            _.bindAll(this);

            this.pages = {}; // child views

            var PagesCollection = require('collections/pages');
            this.collection = new PagesCollection();
            this.collection.fetch({
                success: this.render,
                dataType: "jsonp"
            });
        },


        // Public method
        nextPage: function (urlValues) {

            var oldValues = this.getter('urlValues');

            if (urlValues === null || urlValues[0] === oldValues[0])
                return;

            this.setter('urlValues', urlValues);

            return this;
        },


        update: function () {

            var urlValues = this.getter('urlValues');

            this.pages[urlValues[0]].update(urlValues);
        },



        render: function () {

            // we want to animate SVG fill and stroke properties
            $.Color.hook("fill stroke");

            $('article#content > section').addClass('current-page');
            this.$el.animate({
                'opacity': 1
            }, 500);
            $('.preloader').fadeOut(500);

            // append pages to the DOM from PagesCollection models,
            // except the currentpage, which is already on the DOM
            this.collection.each(this.setView);

            // init page transition 
            var PageTransition = require('views/widgets/pageTransition');
            this.transition = new PageTransition({
                pages: this.pages
            });

            // enable listeners
            // on current page change transition views 
            this.listenTo(this.collection, 'change:current', this.doTransition);

            // on urlValue change call pageView
            this.listenTo(this.model, 'change:urlValues', this.update);

            this.update(this.getter('urlValues'));
        },


        doTransition: function (_model, val, opts) {

            // CSS Page transitions  
            // if first page load return
            if (this.getter('firstPageLoad')) {
                this.setter('firstPageLoad', false);
                return false;
            }

            if (!val)
                return

            var oldValues = this.getter('urlValues');

            this.transition.render(oldValues[0]);
        },


        getter: function (value) {
            return this.model.get(value);
        },

        setter: function (target, value) {
            this.model.set(target, value);
        },


        setView: function (_model) {

            var slug = _model.get('slug'),
                urlValue = this.getter('urlValues'),
                currentPage = (urlValue[0] === slug) ? true : false,
                page;

            var options = {
                model: _model,
                currentPage: currentPage
            }

            switch (slug) {
            case 'home':
                var Home = require('views/pages/home');
                page = new Home(options);
                break;
            case 'me':
                var Me = require('views/pages/me');
                page = new Me(options);
                break;
            case 'say-hi':
                var SayHi = require('views/pages/sayhi');
                page = new SayHi(options);
                break;
            case 'work':
                var Work = require('views/pages/work');
                page = new Work(options);
                break;
            case 'fun':
                var Fun = require('views/pages/fun');
                page = new Fun(options);
                break;
            }

            if (!currentPage)
                this.$el.append(page.el);

            this.pages[slug] = page;
        }
    });

    return PagesView;

});