# PetCare

**PetCare** é um microserviço web para conectar tutores de animais de estimação a cuidadores, permitindo cadastro de pets, busca de cuidadores por localização, agendamento de serviços e avaliações pós-atendimento.

O projeto foi desenvolvido aplicando conceitos de **Engenharia de Software**, com definição de MVP, user stories, modelagem de dados e arquitetura em camadas.

---

## Documentação

A documentação completa do projeto, incluindo requisitos, user stories, regras de negócio e endpoints, está disponível em:

**📄 Documentação:**  
[docs/petcare-documentacao.pdf](docs/petcare-documentacao.pdf)

---

## Funcionalidades

- Cadastro e autenticação de usuários (Tutor ou Cuidador)
- Gerenciamento de pets (Tutor)
- Busca de cuidadores por localização
- Solicitação e gerenciamento de agendamentos
- Avaliação de cuidadores após o serviço

---

## Tecnologias

- Java  
- Spring Boot  
- Spring Security + JWT  
- MySQL  
- Maven  
- Arquitetura MVC  

---

## Diagramas

### Diagrama de Entidades
![Diagrama de Entidades](docs/diagramas/diagrama-entidades.png)

### Diagrama de Arquitetura
![Diagrama de Arquitetura](docs/diagramas/diagrama-arquitetura.png)

---

<h2>Estrutura do Projeto</h2>

<pre>
src/main/java/com/petcare
 ├── config
 ├── controller
 ├── dto
 ├── entity
 ├── repository
 ├── service
 ├── security
 └── exception
</pre>


---

## Principais Endpoints

| Método | Rota | Descrição |
|------|-----|----------|
| POST | /api/auth/register | Cadastro de usuário |
| POST | /api/auth/login | Login |
| POST | /api/pets | Cadastro de pet |
| GET | /api/cuidadores | Buscar cuidadores |
| POST | /api/agendamentos | Solicitar agendamento |
| PATCH | /api/agendamentos/{id}/status | Atualizar status |
| POST | /api/reviews | Criar avaliação |

---

## Autor

Rodrigo Santana  
https://www.linkedin.com/in/rodrigo-santana24/

