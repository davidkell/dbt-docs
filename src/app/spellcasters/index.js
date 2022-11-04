'use strict';

const angular = require('angular');
const _ = require('lodash');

angular
.module('dbt')
.controller('SpellcastersCtrl', ['$scope', '$state', 'project',
    function($scope, $state, projectService) {
        $scope.overview_md = '(loading)'
        
        projectService.ready(function (project) {

            // Generate the # spells per contributors by Github username

            const models = Object.values(project.nodes).filter(node => node.resource_type === 'model')
            const contributors = models.map(model => {
                // handle "contributors" mispelling and array/comma delimited string cases
                let c = model.meta.contributors || model.meta.contibutors
                c = Array.isArray(c) ? c : (c || '').split(', ')
                return c
            }).flat()

            const stats = Object.entries(_.countBy(contributors)).map(([name, spells]) => ({ name, spells}))
            $scope.spellcasters = _.sortBy(stats, 'spells').reverse()
        });
}]);