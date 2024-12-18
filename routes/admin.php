<?php
//admin panel routes 

use App\Http\Controllers\Admin\ClientController;
use App\Http\Controllers\Admin\CompanyInfoController;
use App\Http\Controllers\Admin\IndexController;
use App\Http\Controllers\Admin\MessageController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\ServiceController;
use Illuminate\Support\Facades\Route;

// using grouping technique
//as => 'admin.' is the prefix for names of route.

Route::group(['prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'auth'], function () {


    Route::controller(IndexController::class)->group(function () {
        Route::redirect('/', '/admin/company-info')->name('index'); //Index is method in AdminController
    });

    // serviceController 
    Route::controller(ServiceController::class)->group(function () {
        Route::get('/service', 'index')->name('service');
        Route::match(['get', 'post'], '/service/detail', 'show')->name('service-show');
        Route::post('/service/save', 'store')->name('service-save');
        Route::post('/service/delete/{serviceId}', 'destroy')->name('service-destroy');
    });

    // project controller 
    Route::controller(ProjectController::class)->group(function () {
        Route::get('/project', 'index')->name('project');
        Route::post('/project/save', 'store')->name('project-save');
        Route::match(['get', 'post'], '/project/detail', 'show')->name('project-show');
    });

    // client controller 
    Route::controller(ClientController::class)->group(function () {
        Route::get('/client', 'index')->name('client');
        Route::post('/client/save', 'store')->name('client-save');
        Route::match(['get', 'post'], '/client/detail', 'show')->name('client-show');
    });

    //message controller
    Route::controller(MessageController::class)->group(function () {
        Route::match(['get', 'post'], '/message', 'index')->name('message');
        Route::match(['get', 'post'], '/message/delete/{messageId}', 'destroy')->name('message-destroy');
    });

    // companyinfo controller 
    Route::controller(CompanyInfoController::class)->group(function () {
        Route::match(['get', 'post'], '/company-info', 'index')->name('companyInfo');
        Route::post('/company-info/save', 'store')->name('info-store');
    });
});
