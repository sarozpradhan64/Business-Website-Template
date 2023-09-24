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
        Schema::create('company_infos', function (Blueprint $table) {
            $table->id();
            $table->string('company_logo',250)->nullable();
            $table->string('company_name',250);
            $table->string('company_name_shortform',250)->nullable();
            $table->string('company_slogan',500)->nullable();
            $table->string('about_us',4000);
            $table->string('established_date',250)->nullable();
            $table->string('license_num',250)->nullable();
            $table->string('registered_num',250)->nullable();
            $table->string('company_address',250)->nullable();
            $table->string('google_map_url',700)->nullable();
            $table->string('email',250);
            $table->string('telephone_num',250)->nullable();
            $table->string('phone_num',250)->nullable();
            $table->string('website',250)->nullable();
            $table->string('linkedin_url',250)->nullable();
            $table->string('facebook_url',250)->nullable();
            $table->string('instagram_url',250)->nullable();
            $table->string('twitter_url',250)->nullable();
            $table->string('youtube_url',250)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('company_infos');
    }
};
