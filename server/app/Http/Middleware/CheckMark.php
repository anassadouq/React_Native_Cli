<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckMark {
    public function handle(Request $request, Closure $next){
        if($request->mark < 10 )
        abort(403);
        return $next($request);
    }
}
