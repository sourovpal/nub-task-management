<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();

            $table->foreignId('status_id')
                ->constrained('task_statuses')
                ->onDelete(null);

            $table->foreignId('board_id')
                ->constrained('boards')
                ->onDelete('cascade');

            $table->string('title');

            $table->longText('description')->nullable();

            $table->double('amount')->default(0.00);

            $table->integer('position')->default(0);

            $table->timestamp('completed_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
