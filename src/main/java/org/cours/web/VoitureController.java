package org.cours.web;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.cours.modele.Proprietaire;
import org.cours.modele.Voiture;
import org.cours.modele.VoitureRepo;
import org.cours.modele.ProprietaireRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/voitures")
@CrossOrigin(origins = "*") // utile pour éviter les erreurs CORS avec React
public class VoitureController {

    @Autowired 
    private VoitureRepo voitureRepo;
    
    @Autowired 
    private ProprietaireRepo proprietaireRepo;

    // 🔍 GET : Liste complète
    @GetMapping
    public Iterable<Voiture> getAllVoitures() {
    	Iterable<Voiture> voits = voitureRepo.findAll();
    	System.out.print(voits);
        return voits;
    }

    // 🔍 GET : Voiture par ID
    @GetMapping("/{id}")
    public Optional<Voiture> getVoitureById(@PathVariable Long id) {
        return voitureRepo.findById(id);
    }

    // ➕ POST : Ajouter une voiture
    @PostMapping
    public Voiture createVoiture(@RequestBody Map<String, Object> payload) {
        Voiture v = new Voiture();
        v.setMarque((String) payload.get("marque"));
        v.setModele((String) payload.get("modele"));
        v.setCouleur((String) payload.get("couleur"));
        v.setImmatricule((String) payload.get("immatricule"));
        v.setAnnee(Integer.parseInt(payload.get("annee").toString()));
        v.setPrix(Integer.parseInt(payload.get("prix").toString()));

        

        return voitureRepo.save(v);
    }


    // ✏️ PUT : Modifier une voiture
    @PutMapping("/{id}")
    public Voiture updateVoiture(@PathVariable Long id, @RequestBody Voiture voiture) {
        voiture.setId(id);
        return voitureRepo.save(voiture);
    }

    // ❌ DELETE : Supprimer une voiture
    @DeleteMapping("/{id}")
    public void deleteVoiture(@PathVariable Long id) {
        voitureRepo.deleteById(id);
    }

    // 🔍 GET : Voitures par couleur
    @GetMapping("/couleur/{couleur}")
    public List<Voiture> getByCouleur(@PathVariable String couleur) {
        return voitureRepo.findByCouleur(couleur);
    }

    // 🔍 GET : Voitures par année
    @GetMapping("/annee/{annee}")
    public List<Voiture> getByAnnee(@PathVariable int annee) {
        return voitureRepo.findByAnnee(annee);
    }

    // 🔍 GET : Voitures par marque et modèle
    @GetMapping("/marque-modele")
    public List<Voiture> getByMarqueAndModele(@RequestParam String marque, @RequestParam String modele) {
        return voitureRepo.findByMarqueAndModele(marque, modele);
    }

    // 🔍 GET : Voitures par marque ou couleur
    @GetMapping("/marque-ou-couleur")
    public List<Voiture> getByMarqueOrCouleur(@RequestParam String marque, @RequestParam String couleur) {
        return voitureRepo.findByMarqueOrCouleur(marque, couleur);
    }

    // 🔍 GET : Voitures par marque triées par année
    @GetMapping("/marque-triee")
    public List<Voiture> getByMarqueOrderByAnneeAsc(@RequestParam String marque) {
        return voitureRepo.findByMarqueOrderByAnneeAsc(marque);
    }

    // 🔍 GET : Voitures par marque (requête JPQL)
    @GetMapping("/marque/{marque}")
    public List<Voiture> getByMarque(@PathVariable String marque) {
        return voitureRepo.findByMarque(marque);
    }
}
