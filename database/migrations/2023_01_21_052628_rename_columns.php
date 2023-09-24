<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('company_infos', function (Blueprint $table) {
            $table->renameColumn('telephone_num', 'telephone');
            $table->renameColumn('phone_num', 'phone_number');
            $table->renameColumn('license_num', 'license_number');
            $table->renameColumn('registered_num', 'registered_number');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('company_infos', function (Blueprint $table) {
            $table->renameColumn('telephone', 'telephone_num');
            $table->renameColumn('phone_number', 'phone_number');
            $table->renameColumn('license_number', 'license_num');
            $table->renameColumn('registered_number', 'registered_num');
        });
    }
};
