<?php
use Evenement\EventEmitterInterface;

return function (\Evenement\EventEmitterInterface $emitter) {
    new \Peridot\Reporter\Dot\DotReporterPlugin($emitter);
};
