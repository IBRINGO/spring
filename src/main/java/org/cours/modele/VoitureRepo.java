package org.cours.modele;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface VoitureRepo extends CrudRepository<Voiture, Long> { 
	
	// Sélectionnez les voitures par marque 
	//List<Voiture> findByMarque(String marque); 
	// Sélectionnez les voitures par couleur 
	List<Voiture> findByCouleur(String couleur); 
	// Sélectionnez les voitures par année 
	List<Voiture> findByAnnee(int annee); 
	// Sélectionnez les voitures par marque et modele 
	List<Voiture> findByMarqueAndModele(String marque, String modele); 
	// Sélectionnez les voitures par marque ou couleur 
	List<Voiture> findByMarqueOrCouleur(String marque, String couleur); 
	// Sélectionnez les voitures par marque et trier par annee 
	List<Voiture> findByMarqueOrderByAnneeAsc(String marque); 
	// Sélectionnez les voitures par marque en utilisant SQL 
	@Query("select v from Voiture v where v.marque = ?1") 
	List<Voiture> findByMarque(String marque); 
	@Query("select v from Voiture v where v.marque like %?1") 
	List<Voiture> findByMarqueEndsWith(String marque); 
} 

