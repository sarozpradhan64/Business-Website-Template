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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title', 250);
            $table->string('slug', 250)->nullable();
            $table->string('url', 250)->nullable();
            $table->string('type', 250)->nullable();
            $table->string('year', 250)->nullable();
            $table->string('thumbnail', 250)->nullable();
            $table->longText('description');
            $table->string('images', '1000')->nullable();
            $table->enum('state', ['on', 'off'])->default('on');
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
        Schema::dropIfExists('projects');
    }
};
