'use strict';

const template = require('./model_tree.html');

angular
.module('dbt')
.directive('modelTree', [function() {
    return {
        scope: {
            tree: '=',
        },
        templateUrl: template,
        link: function(scope) {
            scope.nav_selected = 'project';
        }
    }
}])
.filter('spells', function() { return function(project) { return project.find(item => item.name === 'spellbook').items.find(item => item.name === 'models').items}});
