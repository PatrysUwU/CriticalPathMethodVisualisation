package main

import (
	"backend/controllers"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	app := fiber.New()
	app.Use(cors.New())
	app.Use(logger.New())
	app.Post("/CPM", controllers.RealData)
	app.Get("/CPM", controllers.TestData)

	app.Listen(":3000")
}
