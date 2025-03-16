package controllers

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"math"
	"sort"
	"strings"
)

type CPMNodeData struct {
	C  bool `json:"c"`
	Es int  `json:"es"`
	T  int  `json:"t"`
	Ef int  `json:"ef"`
	Ls int  `json:"ls"`
	Z  int  `json:"z"`
	Lf int  `json:"lf"`
}

type CPMNode struct {
	ID        string      `json:"id"`
	Data      CPMNodeData `json:"data"`
	IsEnd     bool
	IsStart   bool
	PrevNodes []string
	NextNodes []string
}

type Edge struct {
	ID     string `json:"id"`
	Source string `json:"source"`
	Target string `json:"target"`
}

type FormBody struct {
	Activity       string `json:"activity"`
	Time           int    `json:"time"`
	PrevActivities string `json:"prevActivities"`
}

type RequestBody struct {
	Rows []FormBody `json:"rows"`
}

func TestData(c *fiber.Ctx) error {
	testNodes := []CPMNode{{
		ID:   "A",
		Data: CPMNodeData{C: true, Es: 0, T: 2, Ef: 2, Ls: 0, Z: 0, Lf: 2},
	}, {
		ID:   "B",
		Data: CPMNodeData{C: false, Es: 0, T: 2, Ef: 2, Ls: 0, Z: 0, Lf: 2},
	}, {
		ID:   "C",
		Data: CPMNodeData{C: true, Es: 0, T: 2, Ef: 2, Ls: 0, Z: 0, Lf: 2},
	},
	}

	testEdges := []Edge{{
		ID: "A->B", Source: "A", Target: "B",
	}, {
		ID: "B->C", Source: "B", Target: "C",
	},
	}

	return c.JSON(&fiber.Map{"nodes": testNodes, "edges": testEdges})
}

func fillNodeEdgeData(nodeMap map[string]*CPMNode, edgeMap map[string]Edge) (*CPMNode, []*CPMNode) {
	var lastNode *CPMNode
	var startNodes []*CPMNode

	for _, edge := range edgeMap {
		nodeMap[edge.Source].NextNodes = append(nodeMap[edge.Source].NextNodes, edge.Target)
		nodeMap[edge.Target].PrevNodes = append(nodeMap[edge.Target].PrevNodes, edge.Source)
	}

	for _, node := range nodeMap {
		if len(node.PrevNodes) == 0 {
			node.IsStart = true
			startNodes = append(startNodes, node)
		}
		if len(node.NextNodes) == 0 {
			node.IsEnd = true
			lastNode = node
		}
	}

	return lastNode, startNodes
}

func forwardStep(nodeMap map[string]*CPMNode, root *CPMNode) {
	if root.IsStart {
		root.Data.Ef = root.Data.Es + root.Data.T
		return
	}

	maxVal := 0
	for _, nodeKey := range root.PrevNodes {
		prevNode := nodeMap[nodeKey]
		if prevNode.Data.Ef == 0 {
			forwardStep(nodeMap, prevNode)
		}
		maxVal = int(math.Max(float64(maxVal), float64(prevNode.Data.Ef)))
	}

	root.Data.Es = maxVal
	root.Data.Ef = root.Data.Es + root.Data.T
}

func backwardStep(nodeMap map[string]*CPMNode, root *CPMNode) {
	if root.IsEnd {
		root.Data.Lf = root.Data.Ef
		root.Data.Ls = root.Data.Lf - root.Data.T
		root.Data.Z = root.Data.Ls - root.Data.Es
		if root.Data.Z == 0 {
			root.Data.C = true
		}
		return
	}

	minVal := 100
	for _, nodeKey := range root.NextNodes {
		nextNode := nodeMap[nodeKey]
		if nextNode.Data.Ls == 0 {
			backwardStep(nodeMap, nextNode)
		}
		minVal = int(math.Min(float64(minVal), float64(nextNode.Data.Ls)))
	}
	root.Data.Lf = minVal
	root.Data.Ls = root.Data.Lf - root.Data.T
	root.Data.Z = root.Data.Ls - root.Data.Es
	if root.Data.Z == 0 {
		root.Data.C = true
	}
}

func RealData(c *fiber.Ctx) error {
	var body RequestBody
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
	}

	nodeMap := make(map[string]*CPMNode)
	edgeMap := make(map[string]Edge)

	for _, node := range body.Rows {
		if _, exists := nodeMap[node.Activity]; !exists {
			nodeMap[node.Activity] = &CPMNode{ID: node.Activity, Data: CPMNodeData{T: node.Time}}
		}

		if len(node.PrevActivities) > 0 {
			activities := strings.Split(node.PrevActivities, ",")
			for _, activity := range activities {
				activity = strings.TrimSpace(activity)
				if activity != "" {
					edgeID := activity + "->" + node.Activity
					if _, exists := edgeMap[edgeID]; !exists {
						edgeMap[edgeID] = Edge{ID: edgeID, Source: activity, Target: node.Activity}
					}
				}
			}
		}

	}

	lastNode, startNodes := fillNodeEdgeData(nodeMap, edgeMap)

	forwardStep(nodeMap, lastNode)
	for _, node := range startNodes {
		backwardStep(nodeMap, node)
	}
	for _, node := range nodeMap {
		fmt.Println(node)
	}

	keys := make([]string, 0, len(nodeMap))
	for key := range nodeMap {
		keys = append(keys, key)
	}

	sort.Strings(keys)

	var nodes []CPMNode
	for _, key := range keys {
		nodes = append(nodes, *nodeMap[key])
	}

	var edges []Edge
	for _, edge := range edgeMap {
		edges = append(edges, edge)
	}

	return c.JSON(fiber.Map{"nodes": nodes, "edges": edges})

}
