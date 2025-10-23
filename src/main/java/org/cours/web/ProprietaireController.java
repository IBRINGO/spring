package org.cours.web;

import java.util.List;
import java.util.Optional;

import org.cours.modele.Proprietaire;
import org.cours.modele.ProprietaireRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/proprietaires")
@CrossOrigin(origins = "*")
public class ProprietaireController {

    @Autowired
    private ProprietaireRepo proprietaireRepo;

    // 🔍 GET : Tous les propriétaires
    @GetMapping
    public Iterable<Proprietaire> getAllProprietaires() {
        return proprietaireRepo.findAll();
    }

    // 🔍 GET : Par ID
    @GetMapping("/{id}")
    public Optional<Proprietaire> getProprietaireById(@PathVariable Long id) {
        return proprietaireRepo.findById(id);
    }

    // ➕ POST : Ajouter
    @PostMapping
    public Proprietaire createProprietaire(@RequestBody Proprietaire proprietaire) {
        return proprietaireRepo.save(proprietaire);
    }

    // ✏️ PUT : Modifier
    @PutMapping("/{id}")
    public Proprietaire updateProprietaire(@PathVariable Long id, @RequestBody Proprietaire proprietaire) {
        proprietaire.setId(id);
        return proprietaireRepo.save(proprietaire);
    }

    // ❌ DELETE : Supprimer
    @DeleteMapping("/{id}")
    public void deleteProprietaire(@PathVariable Long id) {
        proprietaireRepo.deleteById(id);
    }

    // 🔍 GET : Par nom
    @GetMapping("/nom/{nom}")
    public List<Proprietaire> getByNom(@PathVariable String nom) {
        return proprietaireRepo.findByNom(nom);
    }

    // 🔍 GET : Par prénom
    @GetMapping("/prenom/{prenom}")
    public List<Proprietaire> getByPrenom(@PathVariable String prenom) {
        return proprietaireRepo.findByPrenom(prenom);
    }

    // 🔍 GET : Par nom et prénom
    @GetMapping("/search")
    public List<Proprietaire> getByNomAndPrenom(@RequestParam String nom, @RequestParam String prenom) {
        return proprietaireRepo.findByNomAndPrenom(nom, prenom);
    }
}

