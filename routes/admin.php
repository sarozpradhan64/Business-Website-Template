<?php
//admin panel routes 

use App\Http\Controllers\Admin\ClientController;
use App\Http\Controllers\Admin\CompanyInfoController;
use App\Http\Controllers\Admin\IndexController;
use App\Http\Controllers\Admin\MessageController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\ServiceController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;

// using grouping technique
//as => 'admin.' is the prefix for names of route.

Route::group(['prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'auth'], function () {


    Route::controller(IndexController::class)->group(function () {
        Route::redirect('/', '/admin/company-info')->name('index'); //Index is method in AdminController
    });

    // serviceController 
    Route::controller(ServiceController::class)->group(function () {
        Route::get('/service', 'Service')->name('service');
        Route::match(['get', 'post'], '/service/detail', 'detailService')->name('serviceDetail');
        Route::post('/service/save', 'saveService')->name('serviceSave');
        Route::post('/service/delete/{serviceId}', 'deleteService')->name('serviceDelete');
    });

    // project controller 
    Route::controller(ProjectController::class)->group(function () {
        Route::get('/project', 'Project')->name('project');
        Route::post('/project/save', 'saveProject')->name('projectSave');
        Route::match(['get', 'post'], '/project/detail', 'detailProject')->name('projectDetail');
    });

    // client controller 
    Route::controller(ClientController::class)->group(function () {
        Route::get('/client', 'client')->name('client');
        Route::post('/client/save', 'saveClient')->name('clientSave');
        Route::match(['get', 'post'], '/client/detail', 'detailClient')->name('clientDetail');
    });

    //message controller
    Route::controller(MessageController::class)->group(function () {
        Route::match(['get', 'post'], '/message', 'Message')->name('message');
        Route::match(['get', 'post'], '/message/delete/{messageId}', 'deleteMessage')->name('messageDelete');
    });

    // companyinfo controller 
    Route::controller(CompanyInfoController::class)->group(function () {
        Route::match(['get', 'post'], '/company-info', 'CompanyInfo')->name('companyInfo');
        Route::post('/company-info/save', 'saveInfo')->name('infoSave');
    });
});
