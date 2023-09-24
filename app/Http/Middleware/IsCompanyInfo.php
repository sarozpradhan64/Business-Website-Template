<?php

namespace App\Http\Middleware;

use App\Models\CompanyInfo;
use Closure;
use Illuminate\Http\Request;

class IsCompanyInfo
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (empty(CompanyInfo::first())) {
            return redirect('/admin');
        } else {
            return $next($request);
        }
    }
}
