<?php

namespace GovUkBlogs;

use \phpmock\mockery\PHPMockery;

describe(NetworkMenu::class, function () {
    beforeEach(function () {
        $this->networkMenu = new NetworkMenu();
    });

    afterEach(function () {
        \Mockery::close();
    });

    it('is registerable', function () {
        expect($this->networkMenu)->to->be->instanceof(\Dxw\Iguana\Registerable::class);
    });

    describe('->register()', function () {
        it('does something', function () {
            // ...

            $this->networkMenu->register();
        });
    });

    describe('->func()', function () {
        it('does a thing', function () {
            // ...
        });
    });
});
