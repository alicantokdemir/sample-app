(function () {
    'use strict';

    angular
        .module('sample')
        .controller('ArticleController', ArticleController)
        .controller('ArticleViewController', ArticleViewController)
        .controller('ArticleEditController', ArticleEditController);

    /** @ngInject */
    function ArticleController(Article) {
        var vm = this;

        if (!Article.articles.length) {
            Article.find().then(function () {
                vm.articles = Article.articles;
            });
        } else {
            vm.articles = Article.articles;
        }

        vm.remove = function (idx) {
            Article.remove(idx);
        }

    }

    /** @ngInject */
    function ArticleViewController($state, Article, $location) {
        var vm = this;
        vm.articleUrl = $location.absUrl();
        Article.findById($state.params.id).then(function (res) {
            vm.current = res;
        });
    }

    /** @ngInject */
    function ArticleEditController($state, Article) {
        var vm = this;
        if ($state.params.id) {

            vm.editMode = true;
            console.log(Article);
            Article.findById($state.params.id).then(function (res) {
                vm.current = res;
            });
        }

        vm.save = function (article) {
            Article.save(article).then(function () {
                $state.go('^.list');
            });
        };
    }
})();
angular
    .module('sample')
    .directive('share', function () {
        return {
            scope: {
                title: '=',
                url: '=',
            },
            templateUrl: 'app/article/share.directive.html'
        }

    });