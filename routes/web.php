<?php


use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;


Route::group(['middleware' => 'IsCompanyInfo'], function () {
Route::get('/', [HomeController::class,'Home'])->name('home');
Route::get('/about', [HomeController::class, 'About'])->name('about');
Route::get('/projects', [HomeController::class, 'Projects'])->name('projects');
Route::get('/project/{slug}',  [HomeController::class, 'ProjectDetail'])->name('projectDetail');
Route::match(['get', 'post'],'/contact', [HomeController::class, 'Contact'])->name('contact');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


// auth routes 
require __DIR__.'/auth.php';

//admin panel routes 
require __DIR__.'/admin.php';