package org.cours.modele;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.repository.query.Param;

@RepositoryRestResource
public interface ProprietaireRepo extends CrudRepository<Proprietaire, Long> {

    List<Proprietaire> findByNom(@Param("nom") String nom);
    List<Proprietaire> findByPrenom(@Param("prenom") String prenom);
    List<Proprietaire> findByNomAndPrenom(@Param("nom") String nom, @Param("prenom") String prenom);
}
